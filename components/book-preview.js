// @ts-check

const template = document.createElement("template")

template.innerHTML = /* Html */ `
    .preview {
        border-width: 0;
        width: 100%;
        font-family: Roboto, sans-serif;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-align: left;
        border-radius: 8px;
        border: 1px solid rgba(var(--color-dark), 0.15);
        background: rgba(var(--color-light), 1);
    }
    
    @media (min-width: 60rem) {
        .preview {
        padding: 1rem;
        }
    }
    
    .preview_hidden {
        display: none;
    }
    
    .preview:hover {
        background: rgba(var(--color-blue), 0.05);
    }
    
    .preview__image {
        width: 48px;
        height: 70px;
        object-fit: cover;
        background: grey;
        border-radius: 2px;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
    }
    
    .preview__info {
        padding: 1rem;
    }
    
    .preview__title {
        margin: 0 0 0.5rem;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        color: rgba(var(--color-dark), 0.8)
    }
    
    .preview__author {
        color: rgba(var(--color-dark), 0.4);
    }

    <div class="preview" data-preview>
        <img
            class="preview__image"
            src=""
        />
        
        <div class="preview__info">
            <h3 class="preview__title"></h3>
            <div class="preview__author"></div>
        </div>
    </div>
`

class BookPreview extends HTMLElement {
    #dataPreview = this.getAttribute('data-preview')
    // @ts-ignore
    #src = this.getAttribute('src')
    // @ts-ignore
    #title = this.getAttribute('title')
    // @ts-ignore
    #author = this.getAttribute('author')

    // @ts-ignore
    #elements = {
        /**
         * @type {undefined | HTMLImageElement}
         */
        dataPreview: undefined,
        /**
         * @type {undefined | HTMLImageElement}
         */
        img: undefined,
        /**
         * @type {undefined | HTMLElement}
         */
        title: undefined,
        /**
         * @type {undefined | HTMLElement}
         */
        author: undefined,
    }

    #inner = this.attachShadow({ mode: "closed" })

    constructor() {
        super()
        const { content } = template
        this.#inner.appendChild(content.cloneNode(true))
    }

    connectedCallback() {
        this.#elements = {
            // @ts-ignore
            dataPreview: this.#inner.querySelector('data-preview'),
            // @ts-ignore
            img: this.#inner.querySelector('img'),
            // @ts-ignore
            title:  this.#inner.querySelector('h3'),
            // @ts-ignore
            author:  this.#inner.querySelector('.preview__author'),
        }

        // @ts-ignore
        this.#elements.dataPreview.src = this.#dataPreview
        // @ts-ignore
        this.#elements.img.src = this.#src
        // @ts-ignore
        this.#elements.title.innerText = this.#title
        // @ts-ignore
        this.#elements.author.innerText = this.#author

    }
}

customElements.define('book-preview', BookPreview)