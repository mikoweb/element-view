import domDelegate from 'dom-delegate';

/**
 * Simple View layer for HTMLElement
 */
export default class ElementView {
    /**
     * @return {Delegate}
     * @constructor
     */
    static get Delegate() {
        return domDelegate.Delegate;
    }

    /**
     * Event listeners.
     *
     * @return {Object.<String, Function|Object.<String, Function>>}
     */
    get events() {
        return {};
    }

    /**
     * Direct access to Delegate.
     *
     * @return {Delegate}
     */
    get delegate() {
        return this._delegate;
    }

    /**
     * Root element.
     *
     * @return {HTMLElement}
     */
    get root() {
        return this._root;
    }

    /**
     * @param {HTMLElement} htmlElement
     * @param {string} [listenerContext]
     */
    constructor(htmlElement, listenerContext = 'view') {
        /** @protected */
        this._listenerContext = listenerContext;
        /** @protected */
        this._root = htmlElement;
        /** @protected */
        this._delegate = new ElementView.Delegate(htmlElement);
        this._attachListeners(this.events);
    }

    /**
     * Remove all registered listeners and attach them again.
     */
    resetEvents() {
        this._delegate.off();
        this._attachListeners(this.events);
    }

    /**
     * @param {Object.<String, Function|Object.<String, Function>>} listeners
     * @param {String} [selector]
     *
     * @protected
     */
    _attachListeners(listeners, selector = null) {
        for (const eventName in listeners) {
            if (listeners.hasOwnProperty(eventName)) {
                const listener = listeners[eventName];

                switch (typeof listener) {
                    case 'function':
                        if (selector === null) {
                            this._delegate.on(eventName, (...args) => {
                                listener.apply(this, args);
                            });
                        } else if (typeof selector === 'string') {
                            this._delegate.on(eventName, selector, (...args) => {
                                listener.apply(this, args);
                            });
                        }

                        break;
                    case 'object':
                        if (selector === null) {
                            this._attachListeners(listener, eventName);
                        }

                        break;
                    default:
                }
            }
        }
    }

    /**
     * @return {Object}
     *
     * @protected
     */
    _getListenerContext() {
        let context;

        switch (this._listenerContext) {
            case 'view':
                context = this;
                break;
            case 'root':
                context = this.root;
                break;
            case 'host':
                context = this.root.host;
                break;
            default:
                context = this;
        }

        return context;
    }
}
