const zoomItem = document.querySelector("#zoomHeader");
const zoomItemPos = zoomItem.getBoundingClientRect();
console.log("Starting Bottom Pos:", zoomItemPos.bottom);

//Use the abort controllers to stop the event listener once it's finished
const scrollAbortControl = new AbortController();

//MDN recommends manually slowing down the rate at which
//the window listens for scroll events.
//Read more about throttling or debouncing here:
//https://web.archive.org/web/20220714020647/https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
window.addEventListener("scroll", () => {
    console.log(`${window.scrollY} vs ${zoomItemPos.bottom}`);
    if (!zoomItem.classList.contains("zoomAnimation") && window.scrollY + window.innerHeight > zoomItemPos.bottom) {
      console.log("Adding animation CSS class", zoomItemPos.bottom);
      zoomItem.classList.add("zoomAnimation");
      //scrollAbortControl.abort();
    } else if (zoomItem.classList.contains("zoomAnimation") && window.scrollY + window.innerHeight <= zoomItemPos.bottom) {
      console.log("Removing animation CSS class");
      zoomItem.classList.remove("zoomAnimation");
    }
  },
  { signal: scrollAbortControl.signal }
);
