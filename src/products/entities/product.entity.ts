import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-images.entity";
import { User } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products'})
export class Product {

    @ApiProperty({  
        example: '8ad45632-edaa-4c18-9a4f-42b3cc86c17b',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;



    @ApiProperty({  
        example: 'T-Shirt Teslo',
        description: 'Product title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title: string;




    @ApiProperty({  
        example: 0,
        description: 'Product price'
    })
    @Column('float', {
        default: 0,
    })
    price: number;




    @ApiProperty({  
        example: 'anim reprehenderit nulla in anim mollit minim irure commodo.',
        description: 'Product description',
        default: null,
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;



    @ApiProperty({  
        example: 't_shirt_teslo',
        description: 'Product slug - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    slug: string;




    @ApiProperty({  
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0,
    })
    stock: number;




    @ApiProperty({  
        example: ['M','XL','XXL'],
        description: 'Product sizes'
    })
    @Column('text', {
        array: true,
    })
    sizes: string[];




    @ApiProperty({  
        example: 'women',
        description: 'Product gender'
    })
    @Column('text')
    gender: string;



    
    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];


    
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];


    
    @ManyToOne(
        () => User,  //entidad con la que se relaciona
        ( user ) => user.product, // el user se relaciona con un producto
        { eager: true }
    )
    user: User




    @BeforeInsert()
    checkSlugInsert(){

        if ( !this.slug ) {
            this.slug = this.title
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

    

    @BeforeUpdate()
    checkSlugUpdate(){

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }
}
