import { useEffect } from "react";
import Alert from "../components/Alert";
import { Props } from "../configs/Props";

const Home = (props: Props) => {

    useEffect(() => {
    }, []);

    return (
        <div className={``}>

            <Alert state={props.location.state} />

            <div className={``}>
            </div>
        </div>
    )
}

export default Home;
