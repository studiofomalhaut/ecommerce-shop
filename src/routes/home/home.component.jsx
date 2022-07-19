import CategoryContainer from "../../components/category-container/category-container.component"
import { Outlet } from 'react-router-dom' 

const Home = () => {
    return(
        <div>
           <CategoryContainer/>
           <Outlet />
        </div>
    )
}

export default Home