import {SignupButton} from "./signupButton/SignupButton"
import {SigninButton} from "./signinButton/SigninButton"
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import { Button } from "@mui/material";
import './main-page.css';

export function MainPage() {

    const navigate = useNavigate();

    return (
        <div className="main">
            <h3>Dog Food - лучший магазин!</h3>
            <div>
                <SignupButton/>
                <SigninButton/>

                <Button onClick={() => navigate("/login/favorites")}>
                    Избранное
                </Button>
                <Button onClick={() => navigate("/login/faq")}>
                    FAQ
                </Button>
            </div>

            <Routes>
                <Route path='favorites' element={
                    <FavoritePage />
                }
                />
                <Route path='faq' element={<FaqPage />} />
            </Routes>
        </div>
    )
}