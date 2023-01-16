import {rest} from "msw"
import {setupServer} from "msw/node"
import jwt from "jsonwebtoken"
import { CreateProduct, Product } from "../../types/product"
import { User } from "../../types/user"
const products=                [
    {
        id: 1,
        title: "C",
        price: 491,
        description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
        category: {
            "id": 4,
            "name": "Shoes",
            "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=8827"
        },
        images: [
            "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=5418"
        ]
    },
    {
        id: 2,
        title: "A",
        price: 500,
        description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
        category: {
            "id": 2,
            "name": "Shoes",
            "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=8827"
        },
        images: [
            "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=5418"
        ]
    },
    {
        id: 3,
        title: "B",
        price: 150,
        description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
        category: {
            "id": 5,
            "name": "Shoes",
            "image": "https://api.lorem.space/image/shoes?w=640&h=480&r=8827"
        },
        images: [
            "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=5418"
        ]
    }
]
const users=   
   [{id:1
    ,email:"john@mail.com"
    ,password:"changeme"
    ,name:"Jhon"
    ,role:"customer",
    avatar:"https://api.lorem.space/image/face?w=640&h=480&r=4082",
    },
    {id:2,
    email:"maria@mail.com",
    password:"12345",
    name:"Maria",
    role:"customer",
    avatar:"https://api.lorem.space/image/face?w=640&h=480&r=3444",
    },  
    {id:3
        ,email:"admin@mail.com",
        password:"admin123",
        name:"Admin",
        role:"admin",
        avatar:"https://api.lorem.space/image/face?w=640&h=480&r=1449",
        }
    ]
const handler=[
    rest.get("https://api.escuelajs.co/api/v1/products",(req,res,ctx)=>{
        return res(
            ctx.json(products
            )
        )
    }),

    rest.post("https://api.escuelajs.co/api/v1/products",async(req, res, ctx) => {
        const product:CreateProduct = await req.json()
        if (product.price < 1000) {
            return res(
                ctx.status(400, "Data is invalid")
            )
        }
        return res(
            ctx.json(product)
        )
    }),

    rest.put("https://api.escuelajs.co/api/v1/products/:id",async(req, res, ctx) => {
    const update:Partial<Product>=await req.json()
    const {id}=req.params as any
    const foundProduct=products.find(product=>product.id===parseInt(id))
    console.log('server',id)
    console.log(update)
    if(foundProduct){
        return res(
            ctx.json({
                ...foundProduct,
                ...update
            })
        )
    }else{
        return res(
            ctx.status(404,"product not found")
        )
    }
    }),
    rest.post('https://api.escuelajs.co/api/v1/files/upload',async(req,res,ctx)=>{
        const file:File=await req.json()
        console.log('show file',file)
        return res(
            ctx.json(
                {
                    originalname:file.name,
                    filename:file.name,
                    location:`https://api.escuelajs.co/api/v1/files/${file.name}`
                }
            )
        )

    }),
    rest.get("https://api.escuelajs.co/api/v1/users",(req,res,ctx)=>{
        return res(
            ctx.json(users)
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/auth/login",async(req,res,ctx)=>{
        const {email,password}=await req.json()
        const foundUser=users.find(user=>user.email===email&&user.password===password)
        if(foundUser){
            const access_token:string=jwt.sign(foundUser,'mykey')
            console.log('tokeeeeeeeen',access_token)
        return res(
            ctx.json({
                access_token
            }
            )
        )   
        }else{
            return res(ctx.status(401,"unAthorized"))
        }
    }
    ),
    rest.get("https://api.escuelajs.co/api/v1/auth/profile",(req,res,ctx)=>{
        const access_tokenArr=req.headers.get("Authorization")?.split(" ")
        if (access_tokenArr){
            const foundUser=jwt.verify(access_tokenArr[1],"mykey")
           // console.log(foundUser)
            return res(
              ctx.json(foundUser)
             )
        }else{
            return res(ctx.status(401,"unAthorized"))
        }
    }),

]

const userhandler=[
    rest.get("https://api.escuelajs.co/api/v1/users",(req,res,ctx)=>{
        return res(
            ctx.json(
                [{id:1
                ,email:"john@mail.com"
                ,password:"changeme"
                ,name:"Jhon"
                ,role:"customer",
                avatar:"https://api.lorem.space/image/face?w=640&h=480&r=4082",
                creationAt:"2022-12-31T20:28:25.000Z",
                updatedAt:"2022-12-31T20:28:25.000Z"
                },
                {id:2,
                email:"maria@mail.com",
                password:"12345",
                name:"Maria",
                role:"customer",
                avatar:"https://api.lorem.space/image/face?w=640&h=480&r=3444",
                creationAt:"2022-12-31T20:28:25.000Z",
                updatedAt:"2022-12-31T20:28:25.000Z"},
                
                {id:3
                    ,email:"admin@mail.com",
                    password:"admin123",
                    name:"Admin",
                    role:"admin",
                    avatar:"https://api.lorem.space/image/face?w=640&h=480&r=1449",
                    creationAt:"2022-12-31T20:28:25.000Z",
                    updatedAt:"2022-12-31T20:28:25.000Z"}
                ]
            )
        )
    })
]

const server = setupServer(...handler)
export default server