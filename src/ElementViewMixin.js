import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

const ElementViewMixin = dedupingMixin((superClass) => {
    /**
     * @polymer
     * @mixinClass
     */
    class Mixin extends superClass {
        /**
         * @param {Object} properties
         *
         * @return {Object}
         */
        static addModelProperty(properties) {
            properties.model = {
                type: Object,
                notify: true,
                value: {}
            };

            return properties;
        }

        /**
         * @return {Object}
         */
        static get properties() {
            return this.addModelProperty({});
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
            return this._view.delegate;
        }

        constructor() {
            super();
            this._view = new ElementView(document.createElement('div'));
        }

        /**
         * @inheritDoc
         */
        ready() {
            super.ready();
            const listeners = this.events;

            class View extends ElementView {
                get events() {
                    return listeners;
                }
            }

            Object.defineProperty(this, '_view', {
                enumerable: false,
                configurable: false,
                writable: false,
                value: new View(this.shadowRoot, 'host'),
            });
        }

        /**
         * Remove all registered listeners and attach them again.
         */
        resetEvents() {
            this._view.resetEvents();
        }

        /**
         * Taking Input.
         *
         * @param {Object} model
         */
        input(model) {
            this.model = model;
        }
    }

    return Mixin;
});

export default ElementViewMixin;
