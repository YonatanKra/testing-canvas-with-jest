const { draw } = require('./index');

(function mockDOMMatrix() {

    class DOMMatrixMock extends DOMMatrix {
        scale = jest.fn().mockImplementation((scaleX, scaleY) => this.setScale(scaleX, scaleY));
        translate = jest.fn().mockImplementation((x, y) => this.setTranslate(x,y));

        setScale(scaleX, scaleY) {
            this.f = scaleY;
            this.e = scaleX;
            return this;
        }

        setTranslate(x,y){
            this.b = x;
            this.c = y;
            return this;
        }
    }

    global.DOMMatrix = DOMMatrixMock;
})();

describe('draw', () => {
    let canvas, ctx;
    beforeEach(function() {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
    });

    it(`should return the shape's path`, function() {
        const shapePath = draw(ctx);
        expect(shapePath instanceof Path2D).toBeTruthy();
    });

    it(`should draw a house on the canvas using the main ctx`, function() {
        draw(ctx);
        const events = ctx.__getEvents();

        expect(events).toMatchSnapshot();
    });

    it(`should draw a house on the canvas using the default scaleX and scaleY`, function() {
        const path = draw(ctx);
        const events = ctx.__getEvents();

        expect(events).toMatchSnapshot();
    });

    it(`should draw a house with given position, scaleX and scaleY`, function() {
        const path = draw(ctx, { position: { x: 10, y: 10 }, scaleX: .5, scaleY: 0 });
        const events = ctx.__getEvents();

        expect(events).toMatchSnapshot();
    });
});
