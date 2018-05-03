import * as React from "react";

import { SketchPicker } from 'react-color';

import SwitchFormat from "../SwitchFormat";

import "./style.scss";

export default class Gradient extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isPalleteActive: false,
            isValid: true,
            gradient: {
                from: "#ffff00",
                to: "#000044",
            },
        };
        this.onGo = this.onGo.bind(this);
        this.validate = this.validate.bind(this);
        this.palletePicker = this.palletePicker.bind(this);
    }

    public from: HTMLInputElement;
    public to: HTMLInputElement;

    validate(color: string) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    }

    palletePicker(value: any) {
        this.setState({ isPalleteActive: value === 'pallete' });
    }

    onGo(e: any) {
        e.preventDefault();
        let from = this.from.value;
        let to = this.to.value;
        this.validate(from) && this.validate(to) ?
            this.setState({ isValid: true, gradient: { from, to } }) :
            this.setState({ isValid: false, gradient: { from: "#fff", to: "#000" } });
    };

    public render() {
        let { isValid, isPalleteActive } = this.state;
        const gradientStyle = { background: `linear-gradient(${this.state.gradient.from}, ${this.state.gradient.to})` };
        return (
            <div className="main-block" style={gradientStyle}>
                <SwitchFormat
                    onChange={this.palletePicker}
                    isPalleteActive={this.state.isPalleteActive}
                />
                {!isPalleteActive ?
                    <div className="main-content">
                        <form className="main-form" onSubmit={this.onGo}>
                            <input type="text" defaultValue="#ffff00" ref={elem => this.from = elem} />
                            <input type="text" defaultValue="#000044" ref={elem => this.to = elem} />
                            <button className="button" type="submit">go</button>
                        </form>
                        {isValid ?
                            <div className="main-text"><p>Welcome to the application page - Profi-Gradient.</p></div>
                            :
                            <div className="main-text-error"><p>Error! Try to use colors with hex format!</p></div>
                        }
                    </div> :
                    <div className="pallete-content">
                        <span className="pallete">
                            <p>From:</p>
                            <SketchPicker color={this.state.gradient.from} onChangeComplete={(color: any) => this.setState({ gradient: { from: color.hex, to: this.state.gradient.to } })} />
                        </span>
                        <span className="pallete">
                            <p>To:</p>
                            <SketchPicker color={this.state.gradient.to} onChangeComplete={(color: any) => this.setState({ gradient: { from: this.state.gradient.from, to: color.hex } })} />
                        </span>
                    </div>
                }

            </div >
        );
    }
}
