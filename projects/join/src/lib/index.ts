/**
MIT License

Copyright (c) Firefly Semantics Corporation
Copyright (c) 2020 Ole K. Ersoy
Copyright (c) 2015 José F. Romaniello

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

/**
 * @param args The components of the URL
 * @throws TypeError if the args URL components are not all of type string 
 * @return The URL string
 */
export function join(...args:string[]): string {
    let components:string[] = []

    /**
     * If an empty array is received then
     * the URL is just ''.
     */
    if (args.length === 0) {
        return ''
    }

    /** The args values must be of type string */
    args.forEach(component => {
        if (typeof component !== 'string') {
            throw new TypeError(
                `Url components must be of type string. 
                    The ${component} component is of type ${typeof component}`)
        }
    })

    /**
     * If the protocol is specified by itself,
     * then the protocol is combined with the 
     * subsequent array value.
     */
    const protocol = args[0]

    if (protocol.match(/^[^/:]+:\/*$/) && args.length > 1) {
        var first = args.shift()
        args[0] = first + args[0]
    }

    /**
     * The file protocol should have two or three slashes. 
     * Other protocols should have 2.
     */
    if (args[0].match(/^file:\/\/\//)) {
        args[0] = args[0].replace(/^([^/:]+):\/*/, '$1:///')
    } else {
        args[0] = args[0].replace(/^([^/:]+):\/*/, '$1://')
    }

    /** The args values must be of type string */
    args.forEach((component, i) => {
        if (component === '') { return }

        /**
         * Remove starting slashes for all but the first component
         */
        if (i > 0) {
            component = component.replace(/^[\/]+/, '')
        }

        /**
         * Remove the ending slashes for each component but the last.
         */
        if (i < args.length - 1) {
            component = component.replace(/[\/]+$/, '')
        } else {
            // For the last combine multiple slashes into one.
            component = component.replace(/[\/]+$/, '/')
        }
        components.push(component)
    })

    /**
     * Separate all the components by a single /
     */
    let url = components.join('/')

    // remove trailing slash before parameters or hash
    url = url.replace(/\/(\?|&|#[^!])/g, '$1')

    // replace ? in parameters with &
    var parts = url.split('?')
    url = parts.shift() + (parts.length > 0 ? '?' : '') + parts.join('&')
    return url
}