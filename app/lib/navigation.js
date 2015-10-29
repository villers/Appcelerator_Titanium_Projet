"use strict";

function Navigation(_args) {
    var that = this;

    _args = _args || {};

    this.isBusy = false;

    this.controllers = [];

    this.currentController = null;

    this.parent = _args.parent;

    this.open = function (_controller, _controllerArguments) {
        if (that.isBusy)
            return;

        that.isBusy = true;

        var controller = Alloy.createController(_controller, _controllerArguments);

        if (that.currentController)
            that.animateOut(that.currentController, "left");

        that.controllers.push(controller);

        that.currentController = controller;

        that.parent.add(that.currentController.getView());

        if (that.currentController.open) {
            that.currentController.open();

            that.isBusy = false;
        } else {
            that.animateIn(this.currentController, "right");
        }

        return that.currentController;
    };

    this.close = function (_callback) {
        if (that.isBusy || that.controllers.length == 1)
            return;

        that.isBusy = true;

        var outgoingController = that.currentController;
        var incomingController = that.controllers[that.controllers.length - 2];

        if (incomingController) {
            that.parent.add(incomingController.getView());

            if (incomingController.open) {
                incomingController.open();

                that.isBusy = false;
            } else {
                that.animateIn(incomingController, "left");
            }
        }

        that.animateOut(outgoingController, "right", function () {
            that.controllers.pop();

            outgoingController = null;

            that.currentController = that.controllers[that.controllers.length - 1];

            if (_callback)
                _callback();
        });
    };


    this.animateIn = function (_controller, _direction, _callback) {
        if (OS_IOS || OS_ANDROID) {
            var animation = Alloy.createController("animateIn").getView();

            animation.addEventListener("complete", function onComplete() {
                that.isBusy = false;

                if (_callback)
                    _callback();

                animation.removeEventListener("complete", onComplete);
            });

            if (OS_IOS)
                _controller.getView().left = _direction === "left" ? -that.parent.size.width : that.parent.size.width;

            animation.left = 0;

            _controller.getView().animate(animation);
        } else {
            that.isBusy = false;

            if (_callback)
                _callback();
        }
    };

    this.animateOut = function (_controller, _direction, _callback) {
        if (OS_IOS || OS_ANDROID) {
            var animation = Alloy.createController("animateOut").getView();

            animation.addEventListener("complete", function onComplete() {
                that.parent.remove(_controller.getView());

                that.isBusy = false;

                if (_callback)
                    _callback();

                animation.removeEventListener("complete", onComplete);
            });

            animation.left = _direction === "left" ? -that.parent.size.width : that.parent.size.width;

            _controller.getView().animate(animation);
        } else {
            that.parent.remove(_controller.getView());

            that.isBusy = false;

            if (_callback)
                _callback();
        }
    };
}

module.exports = function (_args) {
    return new Navigation(_args);
};