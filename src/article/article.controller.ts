import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './schema/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { response } from 'express';
import {Query as ExpressQuery} from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
    constructor(
        private articleService:ArticleService
    ){}

    @Get()
    async getAllArticles(@Res() response, @Query() query:ExpressQuery):Promise<Article[]> {
        try{
            const articleData = await this.articleService.getAllArticle(query)
            return response.status(HttpStatus.OK).json({
                message:"Liste des articles",
                articleData
            })

        }catch(err){
            return response.status(err.status).json(err.response)
        }
    }

    @Post()
    @UseGuards(AuthGuard())
    async createArticle(@Res() response,@Body() article:CreateArticleDto):Promise<Article> {

        try{
            const newArticle = await this.articleService.createArticle(article);
            return response.status(HttpStatus.CREATED).json({
                message:"Article cree avec succes",
                newArticle
            })
        }catch(error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode:400,
                message:"Echec de la creation",
                error:"Bad_Request"
            })
        }
    }

    @Get(':id')
    async getOneArticle(@Res() response,@Param('id') id:string):Promise<Article> {
        try{
            const article = await this.articleService.getOneArticle(id);
            return response.status(HttpStatus.OK).json({
                message:`l'article ${id} a ete trouve`,
                article
            })
        }catch {

        }
    }

    @Put(':id')
    async updateArticle(@Res() response,@Param('id') id:string,@Body() article:UpdateArticleDto):Promise<Article> {
        try{
            const articles = await this.articleService.updateArticle(id, article)
            return response.status(HttpStatus.OK).json({
                message:"L'article a ete modifie avec succes",
                articles
            })
        }catch(err) {
            return response.status(err.status).json(err.response)
        }
    }

    @Delete(':id')
    async deleteArticle(@Res() response,@Param('id') id:string):Promise<Article> {
        try{
            const deleteartcle = await this.articleService.deleteArticle(id);
            return response.status(HttpStatus.OK).json({
                message:"Suppression Reussi",
                deleteartcle
            })
        }catch(err) {
            return response.status(err.status).json(err.response)
        }
    }
}
