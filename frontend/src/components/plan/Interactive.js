import { isOverlap } from "./Overlap";

export class Interactive {
    
    constructor(element, minHeight, setTranslate, setHeight){
        this.oldTransformY = null;
        this.transformY = null;
        this.element = element;
        this.setTranslate = setTranslate;
        this.setHeight = setHeight;
        this.minHeight = minHeight;
    }

    handleDrag = () => {
        let y = 0;
        
        const handleMouseDown = (event) => {
            y = event.clientY;

            // Get the previous transform value
            let temp = this.element.style.transform.substr(11);
            temp = temp.substr(0, temp.length - 3);
            this.oldTransformY = parseInt(temp, 10);

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    
        const handleMouseMove = (event) => {
            let dy = event.clientY - y;
            dy = dy - dy%12;
    
            this.transformY = this.oldTransformY + dy;
            this.setTranslate(this.transformY);
        }
    
        const handleMouseUp = (event) => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            event.stopPropagation();

            if(isOverlap("canvas", "task", this.element))
                this.setTranslate(this.oldTransformY);
        }
    
        this.element.addEventListener('mousedown', handleMouseDown);
    }

    handleResize = () => {
        // pos
        let y = 0;
        // size
        let h = 0;
        
        const f1 = (e) => mouseUpHandler(e, 't');
        const f2 = (e) => mouseUpHandler(e, 'b');

        const mouseUpHandler = (event, torb) => {

            if(isOverlap("canvas", "task", this.element)){
                this.setTranslate(this.oldTransformY);
                this.setHeight(h);
            }

            // Remove the handlers of `mousemove` and `mouseup`
            if(torb === 't')
                document.removeEventListener('mousemove', mouseMoveHandlerTop);
            else
                document.removeEventListener('mousemove', mouseMoveHandlerBottom);
    
            document.removeEventListener('mouseup', f1);
            document.removeEventListener('mouseup', f2);
        };
        
        const mouseDownHandler = (event, torb) => {
            y = event.clientY;
    
            const styles = window.getComputedStyle(this.element);
            h = parseInt(styles.height, 10);
            
            // set the old transform values
            let temp = this.element.style.transform.substr(11);
            temp = temp.substr(0, temp.length - 3);
            this.oldTransformY = parseInt(temp, 10);
    
            if(torb === 't') {
                document.addEventListener('mousemove', mouseMoveHandlerTop);
                document.addEventListener('mouseup', f1);
            }
            else {
                document.addEventListener('mousemove', mouseMoveHandlerBottom);
                document.addEventListener('mouseup', f2);
            }
    
            event.stopPropagation();
        }
    
        const mouseMoveHandlerTop = (event) => {
            // How far the mouse has been moved
            let dy = event.clientY - y;
            dy = dy - (dy%12);  
    
            // Adjust the dimension of element
            if(h-dy >= this.minHeight){
                this.transformY = this.oldTransformY + dy;
                this.setTranslate(this.transformY);
                this.setHeight(h-dy);
            }
    
        };
    
        const mouseMoveHandlerBottom = (event) => {
            // How far the mouse has been moved
            let dy = event.clientY - y;
            dy = dy - (dy%12);
    
            // Adjust the dimension of element
            if(h + dy >= this.minHeight)
                this.setHeight(h+dy);
        }
    
        const resizer_t = this.element.querySelector('.resizer-t');
        const resizer_b = this.element.querySelector('.resizer-b');
    
        resizer_t.addEventListener('mousedown', (e) => mouseDownHandler(e, 't'));
        resizer_b.addEventListener('mousedown', (e) => mouseDownHandler(e, 'b'));
    }
}