class projectItem extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.name = '';
        this.technologies = [];
        this.description = '';
        this.github = '';
        this.projectLink = '';
        this.strongWords = [];
    }

    static get observedAttributes() {
        return ['name', 'technologies', 'description', 'github', 'link', 'strong-words'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'name'){
            this.name = name;
        }
        else if(name === 'technologies') {
            this.technologies = newValue.split(',').map(tech => tech.trim());
        }
        else if(name === 'description') {
            this.description = newValue;
        }
        else if(name === 'github') {
            this.github = newValue;
        }
        else if(name === 'link') {
            this.projectLink = newValue;
        }
        else if(name === 'strong-words') {
            this.strongWords = newValue.split(',').map(tech => tech.trim());
        }
    }

    connectedCallback() {

    }

    createProjectItemHeader() {
        const emTechnologies = this.technologies.map(tech => `<em>${tech}</em>`).join(', ');
        let projectItemHeader = `
            <hr>
            <h3>${this.title} | ${emTechnologies}</h3>    
        `;

        if(this.github != '') {
            let projectItemHeaderH3 = projectItemHeader.querySelector('h3');
            projectItemHeaderH3.textContent += ' | ';
            const newLink = document.createElement('a');
            newLink.setAttribute('href', this.github);
            newLink.setAttribute('target', '_blank');
            projectItemHeaderH3.appendChild(newLink);            
        }

        if(this.projectLink != '') {
            let projectItemHeaderH3 = projectItemHeader.querySelector('h3');
            projectItemHeaderH3.textContent += ' | ';
            const newLink = document.createElement('a');
            newLink.setAttribute('href', this.projectLink);
            newLink.setAttribute('target', '_blank');
            projectItemHeaderH3.appendChild(newLink);            
        }
        return projectItemHeader;
    }
    
    createProjectDescription() {
        
    }
}

customElements.define('project-item', projectItem);