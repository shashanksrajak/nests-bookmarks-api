import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createBookmark(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(createBookmarkDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllBookmarks(@Query() query) {
    return this.bookmarkService.getAllBookmarks(query);
  }
}
