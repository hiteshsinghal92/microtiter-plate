import { Spinner } from "react-bootstrap";
/**
 * 
 * @description Common Spinner loader for application
 */
const SpinerLoader = () => {
    return (
        <div className="text-center">
            <Spinner animation="border" variant="success" />
        </div>
    )

}

export default SpinerLoader;