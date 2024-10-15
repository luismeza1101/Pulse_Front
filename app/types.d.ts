export interface User{
    name: string
    email: string
    password: string
}

export interface Credentials {
    email: string
    password: string
}

export interface NewInfoUser{
    user_id: string
    new_name: string
}

export interface Posts{
    post_id: string
    user_id: string
    content: string
    publication_date: string
    user_name: string
    user_email: string
    cant_comments: number
}

export interface postComment{
    post_id: string
    user_id: string | null
    content: string
}

export interface Comments{
    content: string 
    name: string | null
}

export interface MyPosts{
    post_id: string
    content: string
    publication_date: string
    cant_comments: number
}
export interface TypeMessage {
   message: string | null
   type: 'succes' | 'error'
} 
