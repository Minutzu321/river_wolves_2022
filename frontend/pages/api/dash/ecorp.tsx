import { useId } from "react";
import { useAuth } from "../../../libs/autorizare";
import { VOLUNTAR_PERM } from "../../../libs/config";

export default async (req, res) => {
    const [user, ses, prisma, perm] = await useAuth(req, res)
    if(!user){
      res.status(401).json({
          err: "Neautorizat",
      })
      return;
    }

    const body = req.body;

    const ip = body.ip;
    const userAgent = body.ua;

    const hc = body.hc;
    const lg = body.lg;
    const mtp = body.mtp;
    const plt = body.plt;
    const vd = body.vd;

    const [device,ipdb] = await prisma.$transaction([
      prisma.device.findFirst({
        where:{
          userAgent: userAgent,
          userId: user.id,
        },
        include:{
          ips: true,
        }
      }),
      prisma.iP.upsert({
        where:{
          ip: ip,
        },
        create:{
          ip: ip,
        },
        update:{},
        select:{
          id: true,
        }
      }),
    ])

    if(!device){
      await prisma.device.create({
        data:{
          userAgent: userAgent,
          userId: user.id,
          ips:{
            connect: ipdb
          }
        }
      })
    }else{
      let ina = false;

      for(let ipd of device.ips){
        if(ipd.ip === ip){
          ina = true;
          break;
        }
      }
      
      if(!ina){
        await prisma.device.update({
          where:{
            id: device.id,
          },
          data:{
            ultimaActiune: new Date(),
            hardwareConcurrency: hc,
            language: lg,
            maxTouchPoints: mtp,
            platform: plt,
            vendor: vd,
            ips:{
              connect: ipdb,
            }
          }
        })
      }else{
        await prisma.device.update({
          where:{
            id: device.id,
          },
          data:{
            ultimaActiune: new Date(),
            hardwareConcurrency: hc,
            language: lg,
            maxTouchPoints: mtp,
            platform: plt,
            vendor: vd,
            ips:{
              connect: ipdb,
            }
          }
        })
      }
    }
    
    
    res.status(200).json({
        done: true,
    })

}