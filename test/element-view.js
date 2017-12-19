describe('ElementView', () => {
    const el = document.createElement('div');
    const view = new ElementView(el);

    beforeEach(() => {
        sinon.spy(view, 'resetEvents');
        sinon.spy(view, '_attachListeners');
        sinon.spy(view.delegate, 'off');
    });

    afterEach(() => {
        view.resetEvents.restore();
        view._attachListeners.restore();
        view.delegate.off.restore();
    });

    it('test root value', () => {
        expect(el).to.equal(view.root);
    });

    it('delegate is instance of Delegate', () => {
        expect(view.delegate).to.be.an.instanceof(ElementView.Delegate);
    });

    it('call resetEvents', () => {
        view.resetEvents();
        expect(view._attachListeners).to.have.been.callCount(1);
        expect(view.delegate.off).to.have.been.called;
    });

    it('events is empty', () => {
        expect(view.events).to.be.empty;
    });

    describe('View Instance', () => {
        document.body.innerHTML = `<div class="sample">
            <button class="sample__button"></button>
            <input class="sample__input">
        </div>`;

        class View extends ElementView {
            get events() {
                return {
                    click: this.onClick,
                    '.sample__button': {
                        click: this.onClickButton,
                        focus: this.onFocusButton
                    },
                    custom: this.onCustomEvent,
                    '.sample__input': {
                        focus: this.onFocusInput
                    }
                };
            }

            onCustomEvent() {
                this.fakeAction();
            }

            onClick() {
                this.fakeAction();
            }

            /**
             * @param {Event} e
             */
            onClickButton(e) {
                this.fakeAction();
            }

            onFocusButton() {
                this.fakeAction();
            }

            onFocusInput() {
                this.fakeAction();
            }

            fakeAction() {
                void(0);
            }
        }

        const view = new View(document.querySelector('.sample'));

        beforeEach(() => {
            sinon.spy(view, 'fakeAction');
        });

        afterEach(() => {
            view.fakeAction.restore();
        });

        it('test onClick', () => {
            document.querySelector('.sample').click();
            expect(view.fakeAction).to.have.been.callCount(1);
        });

        it('test onCustomEvent', () => {
            document.querySelector('.sample').dispatchEvent(new Event('custom'));
            expect(view.fakeAction).to.have.been.callCount(1);
        });

        it('test onClickButton', () => {
            document.querySelector('.sample__button').dispatchEvent(new Event('click', {
                bubbles: true
            }));

            expect(view.fakeAction).to.have.been.callCount(2);
        });

        it('test onFocusButton', () => {
            document.querySelector('.sample__button').dispatchEvent(new Event('focus', {
                bubbles: true
            }));

            expect(view.fakeAction).to.have.been.callCount(1);
        });

        it('test onFocusInput', () => {
            document.querySelector('.sample__input').dispatchEvent(new Event('focus', {
                bubbles: true
            }));

            expect(view.fakeAction).to.have.been.callCount(1);
        });
    });
});
