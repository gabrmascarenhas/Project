import supabase from '../config/supabase';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (request, response, ) => {
    const { name, email, password } = request.body;

    const passwordHashed = await bcrypt.hash(password, 10);

    const { data, err } = await supabase.from('users').insert([{ 
        name,
        email,
        password: passwordHashed
    }]);
    if(err) {
        return response.status(500).json({
            error: "Erro: ", err
        })
    }
    response.status(201).json({
        msg: "Usuário cadastrado com sucesso!"
    })
};

const authentication = async (request, response) =>{
    const { email, password } = request.body;
    
    const {data: user, err } = await supabase.from('users')
    .select("*")
    .eq('email', email)
    .single();

    if(err || !user) return response.status(401).json({
        msg: "Credenciais inválidas"
    });

    const passwordsent = await bcrypt.compare(password, user.password);

    if(!passwordsent) {
        return response.status(401).json({
            msg: 'Credenciais inválidas.'
        });
    }
    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d'}
    );

    response.json({ token });

};

const userList = async (request, response) => {
    const { data, err } = await supabase.from('users').select('id, name, email');

        if(err) {
            return response.status(500).json({
                erro: "Error: ", err 
            });
        }
        response.json(data);
};

const userUpdate = async (request, response) => {
const { id } = request.params;
const { name, email, password } = request.body;

const dataUpdate = {
    ...(name && { name }),
    ...(email && {email}),
    ...(password && {password: await bcrypt.hash(password, 10)})
}
    const { err } = await supabase.from('users').update(dataUpdate).eq('id', id);
    
    if(err){
        return response.status(500).json({
        msg: "Erro: ", err 
        })
    }
        response.json({msg: "Usuário atualizado com sucesso"});
};

const userDelete = async (request, response) => {   
    const { id } = request.params;

    const { err } = await supabase.from('users')
    .delete()
    .eq('id', id);

    if(err){
        return response.status(500).json({
            msg: "Erro: ", err
 });
            
    }
    response.json({ msg: "Usuário excluido com sucesso."})
};

export default { registerUser, authentication, userList, userUpdate, userDelete};