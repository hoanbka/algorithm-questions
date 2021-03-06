389. Find the Difference

Given two strings s and t which consist of only lowercase letters.

String t is generated by random shuffling string s and then add one more letter at a random position.

Find the letter that was added in t.

Example:

Input:
s = "abcd"
t = "abcde"

Output:
e

Explanation:
'e' is the letter that was added.
Hide Company Tags Google
Hide Tags Hash Table Bit Manipulation
Hide Similar Problems (E) Single Number

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
// 1. hash map
// 2. char code

// char code
// O(max(m, n)) => O(n)
// String.fromCharCode(10)
// "a".charCodeAt(0);
var findTheDifference = function(s, t) {
    let charCode = t.charCodeAt(t.length - 1);
    for (let i = 0; i < s.length; i++) {
        charCode -= s.charCodeAt(i);
        charCode += t.charCodeAt(i);// +t -s
    }
    return String.fromCharCode(charCode);
};


// O(m + n), m = n + 1, so...O(n)
// corner case, duplcates!!: "a","aa" return 'a', map[a] = 1, -> 0 -> -1
var findTheDifference = function(s, t) {
    if (s === null || t === null || t.length === 0) {
        return '';
    }
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (map.has(s.charAt(i))) {
            map.set(s.charAt(i), map.get(s.charAt(i)) + 1);
        } else {
            map.set(s.charAt(i), 1);
        }
    }
    for (let j = 0; j < t.length; j++) {
        // three cases: key doesn't exist, return key; key exist, value--, if value === -1, return key too
        if (map.has(t.charAt(j))) {
            map.set(t.charAt(j), map.get(t.charAt(j)) - 1);
            if (map.get(t.charAt(j)) === -1) {
                return t.charAt(j);
            }
        } else {
            return t.charAt(j);
        }
    }
    return '';
};
