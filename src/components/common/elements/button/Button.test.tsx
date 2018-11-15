import * as React from "react";
import { shallow } from "enzyme";
import { Button } from "./Button";

describe("Component: Button", () => {

    it("Should render", () => {
        const wrapper = shallow(<Button label="label" onClick={jest.fn()} />);
        expect(wrapper).toBeDefined();
    });

    it("Should render custom className", () => {
        const wrapper = shallow(<Button label="label" onClick={jest.fn()} className="my-button" />);
        expect(wrapper.find(".my-button").length).toEqual(1);
    });

    it("Should render custom className", () => {
        const wrapper = shallow(<Button label="label" onClick={jest.fn()} theme="secondary" />);
        expect(wrapper.find(".btn-secondary").length).toEqual(1);
    });

    it("Should fire onClick handler when component is clicked", () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Button label="label" onClick={onClick} />);
        wrapper.find(".custom-button").simulate("click");
        expect(onClick).toHaveBeenCalled();
    });

    it("Should render and display the correct button text", () => {
        const wrapper = shallow(<Button label="label" onClick={jest.fn()} />);
        expect(wrapper.find(".custom-button").text()).toEqual("label");
    });

    it("Should disable button when disabled prop is set to true", () => {
        const wrapper = shallow(<Button label="label" onClick={jest.fn()} disabled={true} />);
        expect(wrapper.find(".custom-button").props().disabled).toBeTruthy();
    });

    it("Should render icon inside button", () => {
        const wrapper = shallow(<Button label="label" onClick={jest.fn()} icon={{ type: "search", category: "fal", position: "left" }} />);
        expect(wrapper.find(".custom-icon-left").length).toEqual(1);
    });
});
