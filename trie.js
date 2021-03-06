function Trie() {
};

Trie.prototype._addWord = function(word,i) {
  if (i == word.length) {
    this.$d = word;
    //add word to $d
    return this;
  } else if (typeof this[word[i]] === 'object') {
    return this[word[i]]._addWord(word, i+1);
  } else {
    this[word[i]] = new Trie();
    return this[word[i]]._addWord(word, i+1);
  }
  return this;
};

Trie.prototype.addWord = function(word) {
  return this._addWord(word,0);
};


Trie.prototype.keys = function() {
  var arr = [];
  for (var key in this) {
    if (key in this.constructor.prototype) continue;
    if (key === "$d") continue;
    arr.push(key);
  }
  return arr;
};

Trie.prototype._goto = function(prefix, i) {
  if (prefix.length === i) {
    return this;
  } else if (!(prefix[i] in this)) {
    return this;
  } else {
    return this[prefix[i]]._goto(prefix, i+1);
  }
};

Trie.prototype.goto = function(prefix) {
  return this._goto(prefix, 0);
};

Trie.prototype._lookup = function() {
  var keys = this.keys();
  var arr = !!this.$d ? [this.$d] : [];
  if (keys.length === 0) {
    return arr;
  } else {
    for (var i = 0; i < keys.length; i++) {
      var branch = this[keys[i]];
      var words = branch._lookup();
      arr = arr.concat(words);
    }
    return arr;
  }
};

Trie.prototype.lookup = function(prefix) {
  var prefixBranch = this.goto(prefix);
  return prefixBranch._lookup();
};

Trie.prototype.stringify = function() {
  return JSON.stringify(this);
};


module.exports = Trie;
