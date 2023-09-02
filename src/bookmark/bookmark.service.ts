import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(createBookmarkDto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: createBookmarkDto,
    });
    console.log(bookmark);
    return bookmark;
  }

  async getAllBookmarks(query) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: Number(query.userId) },
    });
    return bookmarks;
  }
}
