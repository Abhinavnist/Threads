import { CustomErrorReporter } from "@/validation/CustomErrorReporter";
import { registerSchema } from "@/validation/registerSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcryptjs"
import prisma from "@/DB/db.config";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        vine.errorReporter = () => new CustomErrorReporter
        const validator = vine.compile(registerSchema)

        const payload = await validator.validate(data)
        //check email or username 
        const isEmailExist = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })
        if (isEmailExist) {
            return NextResponse.json({
                status: 400, errors: {
                    email: "Email Already Exist or Taken. Please use another one."
                }
            })
        }
        const isUsernameExist = await prisma.user.findUnique({
            where: {
                username: payload.username
            }
        })
        if (isUsernameExist) {
            return NextResponse.json({
                status: 400, errors: {
                    email: "username Already Exist or Taken. Please use another one."
                }
            })
        }
        //hashing password
        const salt = genSaltSync(10)
        payload.password = hashSync(payload.password, salt)

        //insert at db
        await prisma.user.create({
            data: payload
        })
        return NextResponse.json({ status: 200, message: "Account created Succesfully" })
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json(
                { status: 400, errors: error.messages },
                { status: 200 }
            );
        }
    }


}