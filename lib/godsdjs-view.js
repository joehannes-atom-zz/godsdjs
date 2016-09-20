'use babel';

export default class GodsDjsView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('godsdjs');
	this.element.addEventListener("click", this.toggle);

    // Create message element
    const toggle = document.createElement('span');
	toggle.innerText = "God's DJs Radio";
	toggle.classList.add('icon', 'icon-flame');
    this.element.appendChild(toggle);

	this.playing = serializedState ? serializedState.playing : false;
  }



  // Returns an object that can be retrieved when package is activated
  serialize() {
	return {
		playing: this.playing
	};
  }

  toggle() {
	if (this.playing) {
		this.playing = false;
		this.getElement().classList.remove("pulsating");
		this.getElement().removeChild(this.audio);
	} else {
		this.playing = true;
		this.getElement().classList.add("pulsating");
		this.audio = document.createElement('audio');
		this.audio.setAttribute("controls", null);
		this.audio.setAttribute("autoplay", null);
		this.audio.setAttribute("src", "http://www.godsdjsradio.com:8080/stream");
		this.getElement().appendChild(this.audio);
	}

  }

  // Tear down any state and detach
  destroy() {
	this.element.removeEventListener("click", this.toggle);
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
