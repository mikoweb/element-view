# Element View

It's view layer to HTMLElement, that responsible for Event Handling.

## Example of use

Form block:

```html
<form id="form" class="form">
    <input class="form__text">
    <select class="form__choice"></select>
</form>
```

View class:

```javascript
class FormView extends ElementView {
    get events() {
        return {
            mouseenter: this._onMouseEnter,
            '.form__text': {
                input: this._onInputText
            },
            '.form__choice': {
                change: this._onChangeChoice
            }
        };
    }

    _onMouseEnter(event) {
        // ...
    }

    _onInputText(event) {
        // ...
    }

    _onChangeChoice(event) {
        // ...
    }
}
```

Initiate view:

```javascript
new FormView(document.querySelector('#form'));
```

## Web Component example

Template:

```html
<dom-module id="custom-form">
    <template>
        <form id="form" class="form">
            <input class="form__text">
            <select class="form__choice"></select>
        </form>
    </template>
    <script src="custom-form.js"></script>
</dom-module>
```

Custom element:

```javascript
class BlockadeProductsElement extends ElementViewMixin(Polymer.Element) {
    static get is() {
        return 'custom-form';
    }

    get events() {
        return {
            '.form__text': {
                input: this._onInputText
            },
            '.form__choice': {
                change: this._onChangeChoice
            }
        };
    }

    _onInputText(event) {
        // ...
    }

    _onChangeChoice(event) {
        // ...
    }
}

window.customElements.define(CustomFormElement.is, CustomFormElement);
```

Element usage:

```html
<custom-form></custom-form>
```

## Creating and triggering events

It's native feature. [See MDN guide](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events).
