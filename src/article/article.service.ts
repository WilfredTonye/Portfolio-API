import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name)
        private articleModel: mongoose.Model<Article>,
    ){}

    async getAllArticle():Promise<Article[]> {
        const article = await this.articleModel.find();
        return article;
    }

    async createArticle(article:Article):Promise<Article> {
        const articles = await this.articleModel.create(article)
        return articles
    }

    async getOneArticle(Id:string ):Promise<Article> {
        const articleId = await this.articleModel.findById(Id)
        if(! articleId) {
            throw new NotFoundException('Article introuvable')
        }
        return articleId
    }

    async updateArticle(Id:string, article:Article):Promise<Article> {
        return await this.articleModel.findByIdAndUpdate(Id,article, {
            runValidators:true,
            new:true
        })
    }

    async deleteArticle(Id:string):Promise<Article> {
        return await this.articleModel.findByIdAndDelete(Id)
    }
}
