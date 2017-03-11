var ListView = function(scrollElem){
  var self = {};
  self.relativeFirstIndex = 0;
  self.relativeLastIndex = 0;
  self.lastScrollTop = 0;
  self.inFunc = function(){};
  self.outFunc = function(){};

  // Set the relativeLastIndex value
  self.init = function(){
    var n = scrollElem.children.length;
    for(var i = 0; i < n; ++i){
      if((scrollElem.children[i].offsetTop - scrollElem.offsetTop) < scrollElem.offsetHeight){
        self.relativeLastIndex = i;
      }else{
        break;
      }
    }
  }();

  // Calculate the entered/left elements when scroll down
  self.whenScrollDown = function(){
    var curr = self.relativeFirstIndex,
        last = self.relativeLastIndex,
        n = scrollElem.children.length,
        scrollOffset = scrollElem.scrollTop,
        children = scrollElem.children;

    for(;curr < n; ++curr){
      // Item goes out
      if(scrollOffset > (children[curr].offsetTop + self.getMarginTop(children[curr]) - scrollElem.offsetTop)){
        self.onOut(self.relativeFirstIndex);
        ++self.relativeFirstIndex;
      }else if(curr > last){
        // Item entered
        if((children[curr].offsetTop - scrollElem.offsetTop) < (scrollOffset + scrollElem.offsetHeight)){
            ++self.relativeLastIndex;
            self.onIn(self.relativeLastIndex);
        }else{
          break;
        }
      }
    }
  }

  // Calculate the entered/left elements when scroll up
  self.whenScrollUp = function(){
    var curr = self.relativeLastIndex,
        last = self.relativeFirstIndex - 1,
        n = 0,
        scrollOffset = scrollElem.scrollTop,
        children = scrollElem.children;

      for(;curr >= n; --curr){
        // Item goes out
        if((scrollElem.offsetHeight + scrollOffset) < (children[curr].offsetTop - scrollElem.offsetTop)){
          self.onOut(self.relativeLastIndex);
          --self.relativeLastIndex;
        }else if(curr <= last){
          // Item entered
          if(scrollOffset < (children[curr].offsetTop + self.getMarginTop(children[curr]) - scrollElem.offsetTop)){
              --self.relativeFirstIndex;
              self.onIn(self.relativeFirstIndex);
          }else{
            break;
          }
        }
      }
  }

  // Call the scroll handler according to scroll direction (down or up)
  scrollElem.onscroll = function(){
    setTimeout(function(){
      if(scrollElem.scrollTop > self.lastScrollTop){
        self.whenScrollDown();
      }else{
        self.whenScrollUp();
      }
      self.lastScrollTop = scrollElem.scrollTop;
    },10);
  }

  // Helper function
  self.getMarginTop = function(elem){
    return parseInt(getComputedStyle(elem).marginTop,10);
  }

  var api = {
    onIn: function(func){
      self.onIn = func;
      return this;
    },
    onOut: function(func){
      self.onOut = func;
      return this;
    }
  };

  return api;
}
