import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schema/article.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name)
        private articleModel: mongoose.Model<Article>,
    ){}

    async getAllArticle(query:Query):Promise<Article[]> {

        const resPerPage = 3
        const currentPage = Number(query.page) || 1
        const skip = resPerPage*(currentPage -1)
        const keyword = query.keyword ? {
            Titre: {
                $regex:query.keyword,
                $options:'i'
            }
        }:{}
        const article = await this.articleModel.find({...keyword}).limit(resPerPage).skip(skip);
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
