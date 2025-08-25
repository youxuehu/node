import { CommentMetadata, CommentStatusEnum } from "../../yeying/api/audit/audit";
import { CommentDO } from "../mapper/entity";


export function convertCommentMetadata(comment: CommentDO): CommentMetadata {
    return CommentMetadata.create({
        uid: comment.uid,
        auditId: comment.auditId,
        text: comment.text,
        status: convertCommentStatusFrom(comment.status),
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        signature: comment.signature
    })
}

export function convertComment(meta: CommentMetadata): CommentDO {
    const comment = new CommentDO()
    comment.uid = meta.uid
    comment.auditId = meta.auditId
    comment.createdAt = meta.createdAt
    comment.updatedAt = meta.updatedAt
    comment.text = meta.text
    comment.status = convertCommentStatusTo(meta.status)
    comment.signature = meta.signature
    return comment
}

export function convertCommentStatusTo(code: CommentStatusEnum) {
    return CommentStatusEnum[code]
}

export function convertCommentStatusFrom(code: string) {
    const v = CommentStatusEnum[code as keyof typeof CommentStatusEnum]
    return v
}