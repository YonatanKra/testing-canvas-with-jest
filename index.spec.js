const { draw } = require('./index');

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

    });
});
