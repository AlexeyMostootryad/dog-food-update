import './form.module.css'
import { useForm } from 'react-hook-form';
import { FormField } from '../../../../components/formField/FormField'
import api from "../../../../shared/api"
import { useCallback, useContext } from 'react';
import { UserContext } from "../../../../context/userContext"

const emailPattern = {
    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: "Email должен содержать буквы латинского алфавита, цифры и символ @"
}

function LoginForm({ close, setUserName }) {
    const {token, setToken} = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange",
    });

    const onSubmit = useCallback((data) => {
        const { email, password } = data
        api.signIn(email, password)
            .then(obj => {
                localStorage.setItem('token', obj.token);
                api.setToken(obj.token);
                setToken(obj.token);
                setUserName(obj.data.name);
                close();
            })
    },[])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Логин</h3>

                <FormField
                    title="Email"
                    name="email"
                    pattern={emailPattern}
                    register={register}
                    errors={errors} />

                <FormField
                    title="Пароль"
                    name="password"
                    type="password"
                    register={register}
                    errors={errors} />

                <button>Войти</button>
            </form>
        </>
    );
};

export default LoginForm;