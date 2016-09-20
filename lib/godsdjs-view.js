'use babel';

export default class GodsDjsView {

  constructor(serializedState) {
    // Create root element
	let that = this;
    this.element = document.createElement('div');
    this.element.classList.add('godsdjs', 'inline-block', 'pointer-cursor');
	this.element.addEventListener("click", () => { that.toggle());

    // Create message element
    const toggle = document.createElement('span');
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
		if (this.audio) {
			this.audio.removeAttribute("src");
		    this.getElement().removeChild(this.audio);
		}
	} else {
		this.playing = true;
		this.getElement().classList.add("pulsating");
		this.audio = document.createElement('audio');
		this.audio.setAttribute("autoplay", null);
		this.audio.setAttribute("src", "http://www.godsdjsradio.com:8080/stream");
		this.audio = this.getElement().appendChild(this.audio);
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
