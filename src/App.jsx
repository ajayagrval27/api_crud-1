import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
// import TabView from "./Components/TabView"
// import { PropsChild } from "./Components/Dashborad/PropsChild"
import { createContext, useState } from "react"
// import { ApiFormDy } from "./Components/ApiRouterCrud/ApiFormDy"☻
// import { ApiTableDy } from "./Components/ApiRouterCrud/ApiTableDy"
// import { ApiUsersDy } from "./Components/ApiRouterCrud/ApiUsersDy"
// import { Home } from "./Pages/Home"
// import { MyCard } from "./Pages/Card"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
// import { createContext, useState } from "react"
// import { ApiFormDy } from "./Components/ApiRouterCrud/ApiFormDy"
// import { ApiTableDy } from "./Components/ApiRouterCrud/ApiTableDy"
// import { ApiUsersDy } from "./Components/ApiRouterCrud/ApiUsersDy"
// import { About } from "./Pages/About"
// import { Header } from "./Pages/Header"
// import { FormDataApiCrud } from "./Components/FormDataApiCrud"
// import { FormValidation } from "./Components/FormValidation"
// import { FilterArryObj } from "./Components/FilterArryObj"
// import { TokenApiCrud } from "./Components/TokenApiCrud"
// import { ApiCrud } from "./Components/ApiCrud"
// import ApiCrudClass from "./Components/ApiCrudClass"
import { FormApiCrud } from "./Components/RouterCrud/FormApiCrud"
import { TableApiCrud } from "./Components/RouterCrud/TableApiCrud"
// import CFormCrud from "./Components/ClassRouterCrud/CFormCrud"
// import CTableCrud from "./Components/ClassRouterCrud/CTableCrud"
// import { useState } from "react"
// import { FormDataContext } from "./Components/ClassRouterCrud/AllContext"

// export const ApiFormData = createContext()
export const FormData = createContext()

function App() {
    let [userObj, setUserObj] = useState({ })
    let [userArr, setUserArr] = useState([])
    let [blankObj, setBlankObj] = useState({})

    const data = {
        userObj,
        setUserObj,
        userArr,
        setUserArr,
        blankObj,
        setBlankObj,
    }

    return (
        <>
            {/* <TabView /> */}
            {/* <PropsChild /> */}
            {/* <FormDataApiCrud /> */}
            {/* <ApiFormData.Provider value={data}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ApiFormDy />} />
                        <Route path="/ApiTableDy" element={<ApiTableDy />} />
                        <Route path="/ApiUsersDy" element={<ApiUsersDy />}>
                            <Route path=":userId" />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ApiFormData.Provider> */}

            {/* <ApiCrud /> */}
            {/* <ApiCrudClass /> */}
            {/* <TokenApiCrud /> */}
            {/* <FormValidation /> */}
            {/* <FormDataApiCrud /> */}
            {/* <FilterArryObj /> */}

            {/* // <BrowserRouter>
            //     <Header />
            //     <Routes>
            //         <Route path="/" element={<Navigate to="/home" />} />
            //         <Route path="/home" element={<Home />} />
            //         <Route path="/card" element={<MyCard />} />
            //         <Route path="/about" element={<About />} />
            //     </Routes>
            // </BrowserRouter> */}

            {/* <FormData.Provider value={data}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<FormApiCrud />} />
                        <Route
                            path="/TableApiCrud"
                            element={<TableApiCrud />}
                        />
                    </Routes>
                </BrowserRouter>
            </FormData.Provider> */}
            {/* <FormDataContext.Provider value={data}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<CFormCrud />} />
                        <Route path="/CTableCrud" element={<CTableCrud />} />
                    </Routes>
                </BrowserRouter>
            </FormDataContext.Provider> */}
        </>
    )
}

export default App
