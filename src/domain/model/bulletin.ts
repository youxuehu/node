import { CardDO, SolutionDO } from '../mapper/entity'
import { ResponsePage } from '../../yeying/api/common/message'

export interface Solution {
    publisher: string
    language: string
    uid: string
    name: string
    description: string
    signature: string
    createdAt: string
    cards: Card[]
}

export interface Card {
    name: string
    price: string
    variables: string
}

export interface PageResult {
    data: Solution[]
    page: ResponsePage
}

export function convertCardTo(card: Card): CardDO {
    const cardDO = new CardDO()
    cardDO.name = card.name
    cardDO.price = card.price
    cardDO.variables = card.variables
    return cardDO
}

export function convertCardFrom(cardDO: CardDO): Card {
    return {
        name: cardDO.name,
        price: cardDO.price,
        variables: cardDO.variables
    }
}

export function convertSolutionTo(solution: Solution): SolutionDO {
    const solutionDO = new SolutionDO()
    solutionDO.publisher = solution.publisher
    solutionDO.uid = solution.uid
    solutionDO.cards = solution.cards.map((c) => convertCardTo(c))
    solutionDO.name = solution.name
    solutionDO.language = solution.language
    solutionDO.description = solution.description
    solutionDO.signature = solution.signature
    solutionDO.createdAt = solution.createdAt
    return solutionDO
}

export function convertSolutionFrom(solutionDO: SolutionDO): Solution {
    return {
        publisher: solutionDO.publisher,
        uid: solutionDO.uid,
        name: solutionDO.name,
        language: solutionDO.language,
        description: solutionDO.description,
        createdAt: solutionDO.createdAt,
        signature: solutionDO.signature,
        cards: solutionDO.cards.map((c) => convertCardFrom(c))
    }
}
