'use babel';

export default class GodsDjsView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('godsdjs');
	this.element.addEventListener("click", this.toggle);

    // Create message element
    const toggle = document.createElement('span');
    toggle.classList.add('icon', 'icon-flame');
    this.element.appendChild(toggle);

	this.playing = serializedState ? serializedState.playing : false;
	this.audio = new window.AudioContext();
	this.stream = null;
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
		this.element.classList.remove("pulsating");
		this.stream.disconnect(); //this.audio.createMediaStreamSource()
		this.stream = null;
	} else {
		this.playing = true;
		this.element.classList.add("pulsating");
		this.stream = this.audio.createMediaStreamSource("http://www.godsdjsradio.com:8080/stream");
		this.stream.connect(this.audio.destination);
	}

  }

  // Tear down any state and detach
  destroy() {
	this.element.removeEventListener("click", this.toggle);
    this.element.remove();
	this.stream.disconnect();
	this.stream = null;
	this.audio = null;
  }

  getElement() {
    return this.element;
  }

}
