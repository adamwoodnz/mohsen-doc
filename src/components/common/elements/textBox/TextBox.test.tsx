import * as React from "react";
import { shallow } from "enzyme";
import { TextBox } from "./TextBox";

describe("Component: TextBox", () => {
    const props = {
        name: "MyTextBox",
        value: "my-value",
        onChange: jest.fn(),
    };

    it("Should render", () => {
        const wrapper = shallow(<TextBox {...props} />);
        expect(wrapper).toBeDefined();
    });

    it("Should pass custom class", () => {
        const wrapper = shallow(<TextBox {...props} className="myTextbox" />);
        expect(wrapper.hasClass("myTextbox")).toBeTruthy();
    });

    it("Should fire change event", () => {
        const wrapper = shallow(<TextBox {...props} />);
        wrapper.find("input").simulate("change", { target: { value: "test" } });
        expect(props.onChange).toBeCalledWith({ target: { value: "test" } });
    });

    it("Should enable autocomplete when autocomplete is set to true", () => {
        const wrapper = shallow(<TextBox {...props} autoComplete={true} />);
        expect(wrapper.find("input").prop("autoComplete")).toEqual("on");
    });

});
