import { Injectable } from '@angular/core';
import { Category, Device, Group, Room, Software, User  } from '../shared/models/data-model';
import { GenericObjectService } from './generic-object.service'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
		private objectService: GenericObjectService) {
	}
    public idsToObjects(category: Category){
        category.announcements=[]
        for(let id of category.announcementIds){
            let object = this.objectService.getObjectById("announcement",id)
            if( object ){
                category.announcements.push(object)
            }
        }
        category.contacts=[]
        for(let id of category.contactIds){
            let object = this.objectService.getObjectById("contact",id)
            if( object ){
                category.devices.push(object)
            }
        }
        category.devices=[]
        for(let id of category.deviceIds){
            let object = this.objectService.getObjectById("device",id)
            if( object ){
                category.devices.push(object)
            }
        }
        category.faqs=[]
        for(let id of category.faqIds){
            let object = this.objectService.getObjectById("faq",id)
            if( object ){
                category.faqs.push(object)
            }
        }
        category.groups=[]
        for(let id of category.groupIds){
            let object = this.objectService.getObjectById("group",id)
            if( object ){
                category.groups.push(object)
            }
        }
        category.hwconfs=[]
        for(let id of category.hwconfIds){
            let object = this.objectService.getObjectById("hwconf",id)
            if( object ){
                category.hwconfs.push(object)
            }
        }
        category.rooms=[]
        for(let id of category.roomIds){
            let object = this.objectService.getObjectById("room",id)
            if( object ){
                category.rooms.push(object)
            }
        }
        category.softwares=[]
        for(let id of category.softwareIds){
            let object = this.objectService.getObjectById("software",id)
            if( object ){
                category.softwares.push(object)
            }
        }
        category.users=[]
        for(let id of category.userIds){
            let object = this.objectService.getObjectById("user",id)
            if( object ){
                category.users.push(object)
            }
        }
    }
    public objectsToIds(category: Category){
        category.announcementIds=[]
        for( let object of category.announcements){
            category.announcementIds.push(object.id)
        }
        category.contactIds = []
        for( let object of category.contacts){
            category.contactIds.push(object.id)
        }
        category.deviceIds = []
        for( let object of category.devices){
            category.deviceIds.push(object.id)
        }
        category.faqIds = []
        for( let object of category.faqs){
            category.faqIds.push(object.id)
        }
        category.groupIds = []
        for( let object of category.groups){
            category.groupIds.push(object.id)
        }
        category.hwconfIds = []
        for( let object of category.hwconfs){
            category.hwconfIds.push(object.id)
        }
        category.roomIds = []
        for( let object of category.rooms){
            category.roomIds.push(object.id)
        }
        category.softwareIds = []
        for( let object of category.softwares){
            category.softwareIds.push(object.id)
        }
        category.userIds = []
        for( let object of category.users){
            category.userIds.push(object.id)
        }
    }
}  