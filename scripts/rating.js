class RatingWidget extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.max = 5;
        this.rating = 0;
        this.render();
    }

    static get observedAttributes() {
        return ['max'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'max') {
            let maxRating = parseInt(newValue, 10);
            this.max = isNaN(maxRating) ? 3 : Math.max(3, Math.min(10, maxRating));
            this.render();
        }
    }

    render() {
        const {max, rating} = this;

        const stars = Array.from({length: max }, (_, index) => {
            const filled = index < rating;
            return `<span class="star${filled ? ' filled' : ''}">&#9733;</span>`;
        }).join('');

        this.shadowRoot.innerHTML = `
            <style>
                /* Add your styles for the stars here */
                .star {
                    color: gray; /* Default star color */
                    font-size: 3rem;
                    padding: 0.2rem;
                }

                .star:hover {
                    color: white;
                    cursor: pointer;
                }
            </style>
            <div>
                <label for="rating">How satisfied are you?</label>
                <input type="hidden" name="question" value="How satisfied are you?">
                <input type="hidden" name="sentBy" value="HTML">
                <div class="stars">${stars}</div>
            </div>`; 
        const starElements = this.shadowRoot.querySelectorAll('.star');
        starElements.forEach((star, index) => {
            star.addEventListener('click', () => {
                this.rating = index + 1;
                this.sendRequest();
                this.displaySubmissionMessage();
            });
        });
    }

    connectedCallback() {
        this.render();
    }

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

    sendRequest() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://httpbin.org/post", true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200){
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