import getData from './modules/getData.mjs'
import postData from './modules/postData.mjs'
import patchData from './modules/patchData.mjs'
import preloader from './modules/preloader.mjs'
import getAllmd from './modules/getAllmd.mjs'
import getSalemd from './modules/getSalemd.mjs'
import addSalemd from './modules/addSalemd.mjs'
import addProductmd from './modules/addProduct.mjs'
import delSalemd from './modules/delSalemd.mjs'
import menumd from './modules/menumd.mjs'

const container = document.querySelector('.container')
const body = document.querySelector('body')
const preload = document.querySelector('.preloader');
const getAll = document.querySelectorAll('.getAll')
const getSale = document.querySelectorAll('.getSale')
const addSale = document.querySelectorAll('.addSale')
const addProduct = document.querySelectorAll('.addProduct')
const delSale = document.querySelectorAll('.remSale')
const menu = document.querySelector('.menu')
const button = document.querySelector('.addedHim')
const container1 = document.querySelector('.createProduct')
const form = document.querySelector('form')
const vibor = document.querySelector('.vibor')
let sales = [5, 10, 15, 20, 25, 30]

document.addEventListener('load', preloader(preload))

document.addEventListener('DOMContentLoaded', () => {
	getAll.forEach(el => {
	  el.addEventListener('click', () => getAllmd(container, container1, getData, preload))
	})
	getSale.forEach(el => {
		el.addEventListener('click', () => getSalemd(container, container1, getData)) 
	})
	addSale.forEach(el => {
		el.addEventListener('click', () => addSalemd(sales, getData, patchData))
	})
	addProduct.forEach(el => {
		el.addEventListener('click', () => addProductmd(container, container1, form, button, postData))
	})
	delSale.forEach(el => {
		el.addEventListener('click', () => delSalemd(patchData))
	})
	menu.addEventListener('click', async () => menumd(body, vibor))
})