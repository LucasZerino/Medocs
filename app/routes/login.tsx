import { Layout } from "~/components/layout";
import { FormField } from "~/components/form-file";
import { useEffect, useState, useRef } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import  { ActionFunction, json, LoaderFunction, redirect} from "@remix-run/node";
import { login, register } from "~/utils/auth.server";
import { validateCpf, validateUsername, validatePassword } from "~/utils/validators.server";
import { useActionData } from "@remix-run/react";
import { getUser } from "~/utils/auth.server";


export const loader: LoaderFunction = async ({ request }) => {
    return await getUser(request) ? redirect("/") : null
}


export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const action = form.get("_action");
    const userName = form.get("userName");
    const password = form.get("password");
    let cpf = form.get("cpf");

    if(
        typeof action !== "string" ||
        typeof userName !== "string" ||
        typeof password !== "string" 
    ){
        return json({ error: "Invalid form data", form: action },  { status: 400 });
    }

    if( action == 'register' && (
        typeof cpf !== "string"
    ) ){
        return json({ error: "CPF inválido", form: action },  { status: 400 });
    }


    const errors = {
        userName: validateUsername(userName),
        password: validatePassword(password),
            ...(action === 'register' ? {
                cpf: validateCpf(cpf as string || '')
            } : {})

    }

    if(Object.values(errors).some(Boolean)) return json({ errors, fields: { userName, cpf, password }, form: action },  { status: 400 });
        switch(action){
            case 'login': {
                return await login({userName, password})
            }
            case 'register': {
                cpf = cpf as string
                return await register({userName, password, cpf})
          
            }
            default:
                return json({error: 'Invalid form data'}, {status: 400})
        }
}
export default function Login() {

    const actionData = useActionData();
    const [formError, setFormError] = useState(actionData?.error || '')
    const [errors, setErros] = useState(actionData?.errors || {})
    const [action, setAction] = useState('login')
    const firstLoad = useRef(true)
    const [formData, setFormData] = useState({
        userName: actionData?.fields?.userName || '',
        password: actionData?.fields?.password || '',
        cpf: actionData?.fields?.cpf || ''
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({
            ...form,
            [field]: event.target.value
        }))
    }

    useEffect(() => {
        if(!firstLoad.current){
            const newState = {
                cpf: '',
                userName: '',
                password: ''
            }

            setErros(newState)
            setFormData(newState)
            setFormError('')
        }
    }, [action])

    useEffect(() => {
        if(!firstLoad.current){
            setFormError('')
        }
    }, [formData])
    
    useEffect(() => {
        firstLoad.current = false
    }, [])

    return <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold text-gray-500">
                            <span className="text-orange-400">Me</span>Docs
                        </div>
                       <form method="post">
                        <div className="py-10">
                                <h2 className="text-2xl font-bold text-orange-400 mb-2">{
                                    action === 'login' ? 'Faça login para continuar!' : 'Crie sua conta!'
                                }</h2>
                                <div className="border-2 w-10 border-orange-400 inline-block mb-2"/>
                                <p className="text-gray-400 my-3">{
                                    action === 'login' ? 'Entre com suas credenciais' : 'Crie sua conta para continuar'
                                }</p>
                                {
                                    action !== 'login' ? <>
                                        <div className="flex flex-col items-center mb-10">
                                            <div className="bg-gray-100 w-64 p-2 flex items-center">
                                                <FaUser className="text-gray-400 m-2"/>
                                                <FormField
                                                    htmlFor="cpf"
                                                    placeholder="Insira o CPF"
                                                    value={formData.cpf}
                                                    onChange={e => handleInputChange(e, 'cpf')}
                                                    error={errors?.cpf}
                                                />
                                            </div>
                                        </div>
                                    </>
                                     : null
                                }
                                <div className="flex flex-col items-center mb-10">
                                    <div className="bg-gray-100 w-64 p-2 flex items-center">
                                        <FaUser className="text-gray-400 m-2"/>
                                        <FormField
                                            htmlFor="userName"
                                            placeholder="Nome de usuário"
                                            value={formData.userName}
                                            onChange={e => handleInputChange(e, 'userName')}
                                            error={errors?.userName}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                        <MdLockOutline className="text-gray-400 m-2"/>
                                        <FormField
                                            placeholder="Senha"
                                            htmlFor="password"
                                            value={formData.password}
                                            onChange={e => handleInputChange(e, 'password')}
                                            error={errors?.password}
                                            type="password"
                                        />
                                    </div>
                                    {
                                        action === 'login' ? <>
                                         <div className="flex justify-between w-64 mt-3 mb-3">
                                            <label className="flex-items-center text-xs">
                                                <input type="checkbox" className="mr-1"/>
                                                Lembrar-me
                                            </label>
                                            <a href="#" className="text-xs">Esqueci a senha</a>
                                        </div>
                                        </> : null
                                    }
                                    <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
                                        {formError}
                                    </div>
                                <button 
                                className="border-2 cursor-pointer border-orange-400 text-orange-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-orange-400 hover:text-white mt-5 transition duration-300 ease-in-out"
                                type="submit"
                                name="_action"
                                value={action}
                                >{
                                    action === 'login' ? 'Entrar' : 'Cadastrar'
                                }</button>
                                </div>
                            </div>
                       </form>
                    </div>
                    <div className="w-2/5 bg-orange-400 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                        <h2 className="text-2xl font-bold mb-2">Bem vindo ao MeDocs!</h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p className="mb-10">{
                            action === 'login' ? "Se deseja experimentar nossa ferramenta, faça cadastro abaixo!" : "Já possui uma conta? Faça login!"
                        }</p>
                        <button
                        onClick={() => setAction(action === 'login' ? 'register' : 'login')}
                        className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-orange-400 transition duration-300 ease-in-out">{
                            action === 'login' ? "Cadastre-se" : "Entrar"
                        }</button>
                        </div>
                </div>

            </main>
        </div>
      </Layout>
  }
  