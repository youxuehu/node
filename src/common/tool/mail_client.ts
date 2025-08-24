import { Transporter } from 'nodemailer'
import { MailConfig } from '../../config'
import * as nodemailer from 'nodemailer'

/**
 * 这是一个邮件发送工具类，用于发送邮件
 */
export class MailClient {
    /**
     * transporter
     * @private
     */
    private transporter: Transporter

    /**
     * 邮件配置
     * mailConfig {@link MailConfig}
     * @private
     */
    private mailConfig: MailConfig

    /**
     * 构造函数：构造邮件客户端对象
     * @param mailConfig {@link MailConfig}
     */
    constructor(mailConfig: MailConfig) {
        this.transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: mailConfig.secure,
            auth: {
                user: mailConfig.auth?.user,
                pass: mailConfig.auth?.pass
            }
        })
        this.mailConfig = mailConfig
    }

    /**
     * 发送邮件
     * @param mail 邮箱账号
     * @param subject 邮件主题
     * @param html 邮件内容
     * @returns true/false 邮件发送状态：发送成功/发送失败
     */
    async send(mail: string, subject: string, html: string): Promise<boolean> {
        let res: boolean = true
        try {
            const mailOptions: nodemailer.SendMailOptions = {
                from: this.mailConfig.auth?.user,
                to: mail,
                subject: subject,
                html: html
            }
            const info = await this.transporter.sendMail(mailOptions)
            console.log('send mail success，message id:', info.messageId)
        } catch (error) {
            console.error(`send mail error, ${mail},${subject},${html}`, error)
            res = false
        }
        return res
    }
}
