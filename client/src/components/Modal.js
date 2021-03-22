import React,{Component} from 'react';
import ReactDom from 'react-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const dialogName = "dialog-container";


export function DialogContainer() {
    return(
        <div id={dialogName}>

        </div>
    )
}
function makeWrapElement(name) {
    console.log()
    const id = uuidv4();
    var wrapdiv = document.createElement('div');
    wrapdiv.id = id;
    try{
        document.getElementById(name).appendChild(wrapdiv);
    }catch(e){
        console.log(e)
    }
    

    return id;
}

export function showDialog(element){
    const id = makeWrapElement(dialogName);
    try{
        ReactDom.render(element, document.getElementById(id));
    }catch(e){
        alert(e.message);
    }
   
}

export class Dialog extends Component {
    render(){
        return(
            <Modal
                ref={ref => this.Modal = ref}
                className='dialog-modal'
                exitOnClickOutSide
                fullSize
            >
                <h1 className="title">this is test</h1>
            </Modal>
        )
    }

}

export class Modal extends Component {

    constructor(props) {
        super(props);
        this.destroy = this.destroy.bind(this);
        this.animateOut = this.animateOut.bind(this);
        this.state = {
            show: true,
            id: uuidv4(),
        };
        this.animateTime = 300;
        this.onClickOutSide = this.onClickOutSide.bind(this);
        this.contentRef = React.createRef();
    }
    onClickOutSide(e) {
        const { exitOnClickOutSide } = this.props;
        if (this.contentRef && this.contentRef.current && !this.contentRef.current.contains(e.target)) {
            if (exitOnClickOutSide && exitOnClickOutSide != undefined) {
                this.animateOut();
            }
        }

    }
    componentDidMount() {
        const {fullSize} = this.props;
        if (fullSize) {
            document.getElementsByTagName("body")[0].style.overflow="hidden";
        }

        const destroy = () => {
            this.animateOut();
        }
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function (event) {
            window.history.go(1);
            destroy();
        };
    }
    componentWillUnmount(){
        const {fullSize} = this.props;
        if (fullSize) {
            document.getElementsByTagName("body")[0].style.overflow="scroll";
        }
        window.onpopstate = function () {
            return null;
        }
    }

    destroy() {
        const { id } = this.state;
        const parentId = document.getElementById(id).parentNode.id;

        try {
            ReactDom.unmountComponentAtNode(document.getElementById(parentId));
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => {
            try { document.getElementById(parentId).remove(); }
            catch (error) { console.log(error); }
        }, 100);
    }
    animateOut() {
        const { show, id } = this.state;

        if (!show) return;
        this.setState({ show: false });
        setTimeout(() => {
            if (this != null)
                this.destroy();
        }, this.animateTime);
    }

    render() {
        const { children, message, fullSize, exitOnClickOutSide, className } = this.props;

        const initialY = fullSize ? 0 : -300;
        const divClassName = fullSize ? 'fullSize' : '';
        const variants = {
            show: {
                opacity: 1, y: 0,
                transition: { type: 'tween', duration: this.animateTime / 1000 }
            },
            hide: {
                opacity: 0, y: initialY,
                transition: { type: 'tween', duration: this.animateTime / 1000 }
            },
        }

        const { show, id } = this.state;

        return (
            <motion.div
                id={id}
                onClick={this.onClickOutSide}
                className={divClassName}
                initial={show ? 'hide' : 'show'}
                animate={show ? 'show' : 'hide'}
                variants={variants}>
                <div
                    className={className}
                    ref={this.contentRef}
                    onClick={() => { return null }}>
                    {children}
                </div>


            </motion.div>
        )
    }
} /// END PopupWrapper