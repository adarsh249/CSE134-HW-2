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

                .star:hover, .star:hover ~ .star{
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
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define('rating-widget', RatingWidget);