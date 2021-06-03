import { join } from './index'

it("should work", () => {
    expect(join('')).toEqual('')

    expect(
        join('http://www.example.com/', '/pity/the/foo/')).
        toEqual('http://www.example.com/pity/the/foo/')

    expect(
        join('http://www.example.com/', '/pity/the/foo/', '?t=1')).
        toEqual('http://www.example.com/pity/the/foo?t=1')
})

it('should work for hashbang urls', () => {
    expect(
        join('http://www.example.com/', '#!', '/pity/the/foo/', '?t=1')).
        toEqual('http://www.example.com/#!/pity/the/foo?t=1')
})

it('should join protocol', ()=> {

    expect(
        join('http:', 'www.example.com/', '/pity/the/foo/', '?t=1')).
        toEqual('http://www.example.com/pity/the/foo?t=1')
    expect(
        join('http://', 'www.example.com/', '/pity/the/foo/', '?t=1')).
        toEqual('http://www.example.com/pity/the/foo?t=1')
})

it('should remove extra slashes', () => {
    expect(
        join('http://www.example.com/', '#!', '/pity/the/foo/', '?t=1')).
        toEqual('http://www.example.com/#!/pity/the/foo?t=1')
})


it('should remove extra slashes', ()=> {
    expect(
        join('http://www.example.com/////', '#!', '/pity/the/foo/', '?t=1')).
        toEqual('http://www.example.com/#!/pity/the/foo?t=1')
});

it('should remove extra slashes of an encoded URL', ()=> {

    expect(
        join('http://www.example.com/////', '/pity/the/foo/', '?url=http%3A//Ftest.com')).
        toEqual('http://www.example.com/pity/the/foo?url=http%3A//Ftest.com')

    expect(
        join('http://a.com/23d04b3/', '/b/c.html')).
        toEqual('http://a.com/23d04b3/b/c.html')

});

it('should support anchors in urls', () => {
    expect(
        join('http://www.example.com/', '/pity/the/foo/', '?t=1', '#faaaaa')).
        toEqual('http://www.example.com/pity/the/foo?t=1#faaaaa')
})

it('should support protocol-relative urls', () => {
    expect(
        join('//www.example.com/', '/pity/the/foo/', '?t=1', '#faaaaa')).
        toEqual('//www.example.com/pity/the/foo?t=1#faaaaa')
})

it('should support file protocol urls', () => {
    expect(
        join('file:/', 'android_asset', 'foo/bar')).
        toEqual('file://android_asset/foo/bar')

    expect(
        join('file:', 'android_asset', 'foo/bar')).
        toEqual('file://android_asset/foo/bar')

})

it('should support absolute file protocol urls', () => {
    expect(
        join('file:', '///android_asset', 'foo/bar')).
        toEqual('file:///android_asset/foo/bar')

    expect(
        join('file:///', 'android_asset', 'foo/bar')).
        toEqual('file:///android_asset/foo/bar')

    expect(
        join('file:///', '//android_asset', 'foo/bar')).
        toEqual('file:///android_asset/foo/bar')

    expect(
        join('file:///android_asset', 'foo/bar')).
        toEqual('file:///android_asset/foo/bar')
})

it('should merge multiple query params properly', () => {
    expect(
        join('http:', 'www.google.com///', 'foo/bar', '?test=123', '?key=456')).
        toEqual('http://www.google.com/foo/bar?test=123&key=456')
    expect(
        join('http:', 'www.google.com///', 'foo/bar', '?test=123', '?boom=value','?key=456')).
        toEqual('http://www.google.com/foo/bar?test=123&boom=value&key=456')
    expect(
        join('http://example.org/x', '?a=1', '?b=2', '?c=3', '?d=4')).
        toEqual('http://example.org/x?a=1&b=2&c=3&d=4')
})























it('should merge slashes in paths correctly', ()=> {
    expect(join('http://example.org', 'a//', 'b//', 'A//', 'B//')).
    toEqual('http://example.org/a/b/A/B/');
  });

  it('should merge colons in paths correctly', ()=> {
    expect(join('http://example.org/', ':foo:', 'bar'))
    .toEqual('http://example.org/:foo:/bar');
  });

  it('should merge just a simple path without URL correctly', ()=> {
    expect(join('/', 'test')).toEqual('/test');
  });

  it('should fail with segments that are not string', ()=> {

    //Url must be a string. Received true/);
    expect(()=>join(true)).toThrow(TypeError)
    

    /*
    assert.throws(() => join('http://blabla.com/', 1),
                  /Url must be a string. Received 1/);
    assert.throws(() => join('http://blabla.com/', undefined, 'test'),
                  /Url must be a string. Received undefined/);
    assert.throws(() => join('http://blabla.com/', null, 'test'),
                  /Url must be a string. Received null/);
    assert.throws(() => join('http://blabla.com/', { foo: 123 }, 'test'),
                  /Url must be a string. Received \[object Object\]/);
                  */
  })

  it('should merge a path with colon properly', ()=>{
    expect(join('/users/:userId', '/cars/:carId')).
    toEqual('/users/:userId/cars/:carId');
  });

  it('should merge slashes in protocol correctly', ()=> {
    expect(join('http://example.org', 'a')).
    toEqual('http://example.org/a');
    expect(join('http:', '//example.org', 'a')).
    toEqual('http://example.org/a');
    expect(join('http:///example.org', 'a')).
    toEqual('http://example.org/a');
    expect(join('file:///example.org', 'a')).
    toEqual('file:///example.org/a');

    expect(join('file:example.org', 'a')
      ).toEqual('file://example.org/a');

    expect(join('file:/', 'example.org', 'a')
      ).toEqual('file://example.org/a');
    expect(join('file:', '/example.org', 'a')
      ).toEqual('file://example.org/a');
    expect(join('file:', '//example.org', 'a')
      ).toEqual('file://example.org/a');
  });

  it('should skip empty strings', ()=> {
    expect(join('http://foobar.com', '', 'test')).
    toEqual('http://foobar.com/test');
    expect(join('', 'http://foobar.com', '', 'test')).
    toEqual('http://foobar.com/test');
  });

  it('should return an empty string if no arguments are supplied', ()=> {
    expect(join()).toEqual('');
  });