class RatingWidget extends HTMLElement {
    /**
     * Sets up constructor with variables for the current rating and custom attributes
     * for the max stars, star color and star color when hovering.
     */
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.max = 5;
        this.rating = 0;
        this.starColor = 'var(--star-color, gray)';
        this.hoverStarColor = 'var(--hover-star-color, purple)';
        this.render();
    }

    /**
     * Returns the observed attributes that can be changed.
     */
    static get observedAttributes() {
        return ['max', 'color', 'hover-color'];
    }

    /**
     * If attributes are updated, update variables accordingly and re-render. 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        const hexColorValidator = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if(name === 'max') {
            let maxRating = parseInt(newValue, 10);
            this.max = isNaN(maxRating) ? 3 : Math.max(3, Math.min(10, maxRating));
            this.render();
        }
        else if(name === 'color') {
            let color = newValue;
            this.starColor = hexColorValidator.test(color) ? newValue : 'var(--star-color, gray)';
            if(!hexColorValidator.test(this.starColor)) {
                console.log('color attribute must be in hex format.');
            }
            this.render();
        }
        else if(name === 'hover-color') {
            let hoverColor = newValue;
            this.hoverStarColor = hexColorValidator.test(hoverColor) ? newValue : 'var(--hover-star-color, purple)';
            if(!hexColorValidator.test(hoverColor)) {
                console.log('hover-color attribute must be in hex format.');
            }
            this.render();
        }
    }

    /**
     * Re-render with new attributes.
     */
    render() {
        const {max, rating} = this;

        const stars = Array.from({length: max }, (_, index) => {
            const filled = index < rating;
            return `<span class="star${filled ? ' filled' : ''}">&#9733;</span>`;
        }).join('');

        this.shadowRoot.innerHTML = `
            <style>
                .star {
                    color: ${this.starColor};
                    font-size: 3rem;
                    padding: 0.2rem;
                }

                .active {
                    color: ${this.hoverStarColor};
                    cursor: pointer;
                }
            </style>
                <p>How satisfied are you?</p>
                <div class="stars">${stars}</div>
            `; 
        const starElements = this.shadowRoot.querySelectorAll('.star');
        starElements.forEach((star, index) => {
            star.addEventListener('click', () => {
                this.rating = index + 1;
                this.sendRequest();
                this.displaySubmissionMessage();
            });
            star.addEventListener('mouseover', () => {
                for(let i = 0; i <= index; i++) {
                    starElements[i].classList.add('active');
                }
            });
            star.addEventListener('mouseout', () => {
                starElements.forEach(s => {
                    s.classList.remove('active');
                });
            });
        });
    }

    /**
     * Render the initial setup.
     */
    connectedCallback() {
        this.render();
    }

    /**
     * On rating submit, show a message based off the rating.
     */
    displaySubmissionMessage() {
        let message = '';
        if(this.rating / this.max >= 0.8){
            message = `Thank you for the ${this.rating} star rating!!`;
        }
        else {
            message = `Thank you for your feedback of ${this.rating} stars. We'll try to do better!`
        }
        this.shadowRoot.innerHTML = `
            <output>${message}</output>
        `;
    }

    /**
     * On submit, send an XHR Post Request.
     */
    sendRequest() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://httpbin.org/post", true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200){
                let parsedResponse = JSON.parse(xhr.responseText);
                console.log(parsedResponse);
            }
        };
        xhr.setRequestHeader('X-Sent-By', 'JavaScript');
        let formData = new FormData();
        formData.append('rating', this.rating);
        formData.append('question', 'How satisfied are you?');
        formData.append('sentBy', 'JS');
        xhr.send(formData);
    }

}

customElements.define('rating-widget', RatingWidget);