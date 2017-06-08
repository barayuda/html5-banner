/**
 * Globals.
 */
var tl;
var loops = 0;

/**
 * Init.
 */
function init() {
	tl = new TimelineMax({onComplete:restart});

	// Specifications
	var time = 0.5;
	var between = 0.25;
	var wait = 2;
  var waitFramePeople = 7;
  var waitFrame1Text = 1;

	// Debug Frames
	//showFrame(1); return;

	// Utils
	// tl.timeScale(2); // Speed things up
	// tl.seek(5); // Jump to certain frame

	// Wrapper Method Example
	// appear("lockup", time, {opacity:0, y:"+50"});
	// disappear("lockup", time, {delay:time, opacity:0}, "-="+between);

//- Frame 0 ----------------------------------------------------------->
  //tl.from("#lockup", time, {y:"+50"});
  //tl.from("#lockup, #frame0-text", time, {delay:between, autoAlpha:0});
  //tl.to("#lockup, #frame0-text", time, {delay:between, autoAlpha:0});
//- Frame 1 ----------------------------------------------------------->
tl.from("#frame1-text, #frame1b-text", time, {autoAlpha:0, x:"-50"},"-="+between);
tl.from("#frame1-text-back", time+between, {autoAlpha:0, x:"-50"},"-="+between);
  tl.from("#frame1-people", waitFramePeople, {autoAlpha:100, x:"-200"},"-="+wait);


  tl.to("#frame1-text, #frame1b-text, #frame1-text-back", time, {autoAlpha:0},"-="+between);


//- Frame 2 ----------------------------------------------------------->

	/*tl.from("#frame2-copy", time, {autoAlpha:0});
	tl.from("#frame2-text", time, {autoAlpha:0, x:"-50"},"-="+between);
	tl.from("#frame2-image", time, {autoAlpha:0, x:"+50"},"-="+between);

	tl.to("#frame2-copy", time, {delay:wait, autoAlpha:0});
	tl.to("#frame2-text", time, {autoAlpha:0},"-="+between);
	tl.to("#frame2-image", time, {autoAlpha:0},"-="+between); */

//- Frame 3 ----------------------------------------------------------->

	tl.from("#frame3-copy", time, {autoAlpha:0});
  tl.from("#frame3-yes", time, {autoAlpha:0});

	tl.to("#frame3-copy, #frame3-yes", time, {delay:wait, autoAlpha:0});
//- Frame 4 ----------------------------------------------------------->

  	tl.from("#frame4-copy", time, {autoAlpha:0, onComplete:loopCheck});
    tl.from("#logos", time, {autoAlpha:0, y:"+50"}, "-="+between);
    tl.from("#cta", time, {autoAlpha:0, x:"-50"}, "+="+between);

    tl.to("#frame4-copy", time, {delay:wait, autoAlpha:0});
  	tl.to("#lockup", time, {y:"+50"});
}

/**
 * Show the current frame and all its elements without animation. Use to position assets quickly.
 */
function showFrame(num) {
	if (tl) tl.pause();
	var elements = e("frame-"+num).children;
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.visibility = "visible";
	}
}

/**
 * Check loops. If we've reached the loop limit, clear our TimelineMax object.
 * Otherwise, simply increment the loops and let TimelineMax restart.
 */
function loopCheck() {
	if (loops >= 2) tl.clear();
	loops++;
}

/**
 * Start over all the animations as part of a TimelineMax object.
 */
function restart() {
	tl.restart();
}

/**
 * For animating assets at the start of each frame.
 */
function appear(name,time,specs,label) {
	specs.onStart = show;
	specs.onStartParams = [name];

	tl.from("#"+name, time, specs, label);
}

/**
 * For animating assets at the end of each frame.
 */
function disappear(name,time,specs,label,hideOnComplete) {
	hideOnComplete = (hideOnComplete == undefined) ? true : hideOnComplete;
	if (hideOnComplete) {
		specs.onComplete = hide;
		specs.onCompleteParams = [name];
	}

	tl.to("#"+name, time, specs, label);
}

/**
 * Show/hide an element with display block.
 */
function show(name) { e(name).style.display = "block"; }
function hide(name) { e(name).style.display = "none"; }

/**
 * Shorthand to grab an element.
 */
var e = getElement = function(name) {
	return document.getElementById(name);
};
