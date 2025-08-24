import { Solution } from '../../domain/model/bulletin'
import { SolutionCard, SolutionMetadata } from '../../yeying/api/bulletin/bulletin'
import { LanguageCodeEnum } from '../../yeying/api/common/code'

export function convertSolutionMetadataFrom(s: Solution): SolutionMetadata {
    return SolutionMetadata.create({
        publisher: s.publisher,
        uid: s.uid,
        name: s.name,
        language: LanguageCodeEnum[s.language],
        description: s.description,
        createdAt: s.createdAt,
        cards: s.cards.map((c) =>
            SolutionCard.create({
                name: c.name,
                price: c.price,
                variables: c.variables
            })
        ),
        signature: s.signature
    })
}

export function convertSolutionMetadataTo(metadata: SolutionMetadata): Solution {
    return {
        publisher: metadata.publisher,
        uid: metadata.uid,
        name: metadata.name,
        language: LanguageCodeEnum[metadata.language],
        description: metadata.description,
        createdAt: metadata.createdAt,
        cards: metadata.cards.map((c) => {
            return {
                name: c.name,
                price: c.price,
                variables: c.variables
            }
        }),
        signature: metadata.signature
    }
}
