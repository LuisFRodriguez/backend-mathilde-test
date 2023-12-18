import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';


export class TodosController {

  //* DI
  constructor() { }


  public getTodos = async ( req: Request, res: Response ) => {

    const todos = await prisma.car_list.findMany();
    return res.json( todos );
  };


  public getTodoById =  async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    const todo = await prisma.car_list.findFirst({
      where: { id }
    });

    ( todo )
      ? res.json( todo )
      : res.status( 404 ).json( { error: `AUTO with id ${ id } not found` } );
  };





  public createTodo = async ( req: Request, res: Response ) => {
    const { auto_name } = req.body;
    if ( !auto_name ) return res.status( 400 ).json( { error: 'Text property is required' } );

    const new_auto = await prisma.car_list.create({
      data: { auto_name: auto_name }
    })

    res.json( new_auto );

  };




  public updateTodo = async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    const todo = await prisma.car_list.findFirst({
      where: { id }
    });

    if ( !todo ) return res.status( 404 ).json( { error: `AUTO with id ${ id } not found` } );

    const { auto_name, creation_date } = req.body;
    
    const updatedAuto = await prisma.car_list.update({
      where: { id },
      data: { auto_name, creation_date: (creation_date) ? new Date(creation_date) : null }
    });

    res.json( updatedAuto );

  }


  public deleteTodo = async (req:Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.car_list.findFirst({
      where: { id }
    });

    if ( !todo ) return res.status(404).json({ error: `AUTO with id ${ id } not found` });

    const deleteAuto = await prisma.car_list.delete({
      where: {id}
    });
    ( deleteAuto ) 
      ? res.json (deleteAuto)
      : res.status(404).json({ error: `AUTO with id ${ id } not found` });

    res.json( {todo, deleteAuto});

  }
  


}