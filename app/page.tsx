 "use client"

import SiteImage from "@/components/SiteImage"

import { useEffect, useRef, useState } from "react"

import "./reviews.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const maids = [
  "/images/saada/home-1.jpg",
  "/images/saada/home-2.jpg",
  "/images/saada/home-3.jpg",
]






const questions = [
  "هل تقدمون المساعدة في تأشيرة العاملة؟",
  "هل يمكن توظيف عاملة بدوام جزئي؟",
  "هل يمكنني اختيار جنسية العاملة؟",
  "ما هي تكلفة توظيف عاملة في الإمارات؟",
]

const reviews = [
  {
    name: "نورة أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "نورة محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "نورة خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "نورة علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "نورة حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "سارة أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "سارة محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "سارة خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "سارة علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "سارة حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "ريم أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "ريم محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "ريم خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "ريم علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "ريم حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "مريم أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "مريم محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "مريم خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "مريم علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "مريم حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "هند أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "هند محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "هند خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "هند علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "هند حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "أمل أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "أمل محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "أمل خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "أمل علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "أمل حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "ليان أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "ليان محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "ليان خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "ليان علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "ليان حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "جود أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "جود محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "جود خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "جود علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "جود حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "دانة أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "دانة محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "دانة خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "دانة علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "دانة حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "مي أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "مي محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "مي خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "مي علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "مي حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "نور أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "نور محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "نور خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "نور علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "نور حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "رنا أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "رنا محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "رنا خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "رنا علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "رنا حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "دانية أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "دانية محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "دانية خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "دانية علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "دانية حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "عائشة أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "عائشة محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "عائشة خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "عائشة علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "عائشة حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "آمنة أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "آمنة محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "آمنة خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "آمنة علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "آمنة حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "مها أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "مها محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "مها خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "مها علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "مها حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "روان أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "روان محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "روان خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "روان علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "روان حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "تالا أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "تالا محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "تالا خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "تالا علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "تالا حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "شيخة أحمد",
    role: "عميلة من الإمارات",
    text: "التجربة كانت ممتازة. وساعدوني في اختيار العاملة المناسبة لاحتياجات المنزل.",
  },
  {
    name: "شيخة محمد",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت سهلة وواضحة. وكانت المتابعة مستمرة حتى إتمام الاختيار.",
  },
  {
    name: "شيخة خالد",
    role: "عميلة من الإمارات",
    text: "التعامل كان راقياً جداً. وكان الرد على الاستفسارات سريعاً ومفيداً.",
  },
  {
    name: "شيخة علي",
    role: "عميلة من الإمارات",
    text: "الفريق كان متعاوناً وسريعاً. وأشكر الفريق على حسن التعامل والمتابعة.",
  },
  {
    name: "شيخة حسن",
    role: "عميلة من الإمارات",
    text: "أعجبني تنظيم الخدمة. وتم شرح جميع الخطوات بطريقة بسيطة.",
  },
  {
    name: "لانا أحمد",
    role: "عميلة من الإمارات",
    text: "وجدت اهتماماً كبيراً بالتفاصيل. وشعرت أن جميع الإجراءات كانت منظمة.",
  },
  {
    name: "لانا محمد",
    role: "عميلة من الإمارات",
    text: "الإجراءات كانت واضحة من البداية. وكانت التجربة مريحة من البداية إلى النهاية.",
  },
  {
    name: "لانا خالد",
    role: "عميلة من الإمارات",
    text: "المتابعة كانت ممتازة. وكان التواصل سريعاً وواضحاً طوال الوقت.",
  },
  {
    name: "لانا علي",
    role: "عميلة من الإمارات",
    text: "الاختيار كان أسهل مما توقعت. والخيارات كانت مناسبة جداً لما كنت أبحث عنه.",
  },
  {
    name: "لانا حسن",
    role: "عميلة من الإمارات",
    text: "الخدمة كانت أفضل مما توقعت. وساعدني الفريق في الوصول إلى الخيار المناسب بسهولة.",
  },
  {
    name: "Sarah Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Sarah Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Sarah Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Sarah Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Sarah Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Emma Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Emma Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Emma Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Emma Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Emma Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Lina Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Lina Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Lina Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Lina Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Lina Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Maya Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Maya Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Maya Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Maya Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Maya Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Sophia Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Sophia Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Sophia Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Sophia Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Sophia Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Olivia Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Olivia Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Olivia Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Olivia Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Olivia Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Emily Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Emily Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Emily Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Emily Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Emily Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Grace Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Grace Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Grace Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Grace Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Grace Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Hannah Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Hannah Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Hannah Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Hannah Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Hannah Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Mia Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Mia Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Mia Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Mia Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Mia Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Chloe Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Chloe Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Chloe Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Chloe Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Chloe Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Sophie Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Sophie Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Sophie Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Sophie Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Sophie Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Layla Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Layla Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Layla Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Layla Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Layla Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Ava Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Ava Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Ava Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Ava Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Ava Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Isla Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Isla Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Isla Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Isla Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Isla Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Lucy Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Lucy Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Lucy Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Lucy Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Lucy Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Zoe Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Zoe Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Zoe Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Zoe Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Zoe Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Nora Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Nora Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Nora Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Nora Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Nora Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
  {
    name: "Ella Morgan",
    role: "Client from UAE",
    text: "The experience was excellent. and they helped me find a suitable maid for my needs.",
  },
  {
    name: "Ella Reed",
    role: "Client from UAE",
    text: "The service was simple and clear. and the follow-up continued until the final choice.",
  },
  {
    name: "Ella Khan",
    role: "Client from UAE",
    text: "The team was very professional. and my questions were answered quickly and clearly.",
  },
  {
    name: "Ella Adams",
    role: "Client from UAE",
    text: "The support was fast and helpful. and I really appreciated the professional support.",
  },
  {
    name: "Ella Smith",
    role: "Client from UAE",
    text: "I really liked how organized everything was. and every step was explained in a simple way.",
  },
  {
    name: "Amelia Morgan",
    role: "Client from UAE",
    text: "The communication was excellent. and everything was handled in an organized way.",
  },
  {
    name: "Amelia Reed",
    role: "Client from UAE",
    text: "The process was much easier than expected. and the whole experience felt comfortable from start to finish.",
  },
  {
    name: "Amelia Khan",
    role: "Client from UAE",
    text: "The follow-up was very helpful. and the communication was clear throughout the process.",
  },
  {
    name: "Amelia Adams",
    role: "Client from UAE",
    text: "The available options were clear. and the available options matched what I was looking for.",
  },
  {
    name: "Amelia Smith",
    role: "Client from UAE",
    text: "The overall experience was very smooth. and the team made the selection process much easier.",
  },
]

const mixedReviews = (() => {
  const arabic = reviews.filter((review) => !/[A-Za-z]/.test(review.name))
  const english = reviews.filter((review) => /[A-Za-z]/.test(review.name))

  function spread(items: typeof reviews) {
    const result: typeof reviews = []
    const groups = new Map<string, typeof reviews[number][]>()

    for (const item of items) {
      const firstName = item.name.split(" ")[0]
      const group = groups.get(firstName) ?? []
      group.push(item)
      groups.set(firstName, group)
    }

    const names = [...groups.keys()]

    let round = 0
    while (result.length < items.length) {
      let added = false

      for (const name of names) {
        const item = groups.get(name)?.[round]

        if (item) {
          result.push(item)
          added = true
        }
      }

      if (!added) break
      round++
    }

    return result
  }

  const mixedArabic = spread(arabic)
  const mixedEnglish = spread(english)

  const result: typeof reviews = []
  const max = Math.max(mixedArabic.length, mixedEnglish.length)

  for (let i = 0; i < max; i++) {
    if (mixedArabic[i]) result.push(mixedArabic[i])
    if (mixedEnglish[i]) result.push(mixedEnglish[i])
  }

  return result
})()

const steps = [
  ["01", "أخبرنا باحتياجك", "شاركنا تفاصيل منزلك وما تبحث عنه."],
  ["02", "نقترح الأنسب", "نساعدك في اختيار العاملة المناسبة."],
  ["03", "ابدأ الخدمة", "نتابع معك باقي الإجراءات حتى البداية."],
]

const featuredMaids = [
  {
    name: "فاطمة",
    image: 7,
    experience: "3 سنوات خبرة",
    type: "دوام كامل",
  },
  {
    name: "مريم",
    image: 8,
    experience: "5 سنوات خبرة",
    type: "دوام كامل",
  },
  {
    name: "سارة",
    image: 9,
    experience: "4 سنوات خبرة",
    type: "دوام كامل",
  },
]

export default function Home() {

  useEffect(() => {
    const items = document.querySelectorAll(".services-slide")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [logosVisible, setLogosVisible] = useState(false)
  const logosRef = useRef<HTMLDivElement | null>(null)
  const [locationUrl, setLocationUrl] = useState("")
  const [locationEmbed, setLocationEmbed] = useState("")


  useEffect(() => {
    const element = logosRef.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLogosVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch("/api/contact", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data) {
          setLocationUrl(data.location ?? "")
          setLocationEmbed(data.locationEmbed ?? "")
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const logos = document.querySelector(".company-logos-reveal")

    if (!logos) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(
              "opacity-0",
              "translate-y-6",
              "scale-95"
            )

            entry.target.classList.add(
              "opacity-100",
              "translate-y-0",
              "scale-100"
            )

            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.25,
      }
    )

    observer.observe(logos)

    return () => observer.disconnect()
  }, [])

  return (
    <main
      dir="rtl"
      className="home-page min-h-screen overflow-hidden bg-[#F7F9FC] text-[#172033]"
    >
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative mt-4 overflow-hidden bg-white pb-8 pt-12 md:mt-10 md:pb-16 md:pt-24">
        <div className="pointer-events-none absolute -right-40 -top-32 h-[620px] w-[620px] rounded-full bg-[#1257D6]/10 blur-[110px]" />
        <div className="pointer-events-none absolute left-[15%] top-[18%] h-[360px] w-[360px] rounded-full bg-[#5B8DEF]/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[-180px] right-[35%] h-[420px] w-[420px] rounded-full bg-[#1257D6]/[0.06] blur-[100px]" />
        <div className="mx-auto max-w-[1320px] px-4 md:px-8">
          <div className="grid items-start gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            {/* HERO TEXT */}
            <div className="order-2 pt-0 lg:order-1 lg:pt-0">

              <div className="mb-4 flex items-center gap-2 text-[9px] sm:text-[10px] font-normal text-[#F28C28]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F28C28]" />
                خدمة منزلية موثوقة في الإمارات
              </div>

              <h1 className="mb-5 max-w-[650px] text-[32px] font-medium sm:text-[38px] md:text-[56px] leading-[1.28] tracking-[-1.4px] text-[#29456F] sm:text-[47px] md:text-[56px]">
                راحة منزلك تبدأ
                <br />
                <span className="text-[#53709A]">
                  بالاختيار الصحيح.
                </span>
              </h1>

              <p className="mb-6 max-w-[530px] text-[12px] sm:text-[13px] md:text-[16px] font-normal leading-[2.1] text-black/45 md:text-[16px]">
                نساعدك في العثور على عاملة منزلية محترفة وموثوقة
                تناسب احتياجات منزلك، مع متابعة وإجراءات واضحة
                من البداية حتى اكتمال الخدمة.
              </p>

              <div className="mb-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
<a
                  href="/get-maids"
                  className="hero-hire-button group relative inline-flex h-[50px] w-full min-w-0 sm:h-[56px] sm:w-auto sm:min-w-[220px] md:h-[58px] md:min-w-[235px] items-center justify-center gap-2.5 sm:gap-3 lg:gap-4 rounded-[14px] bg-[#1257D6] px-5 text-[13px] sm:px-7 sm:text-[14px] md:px-9 md:text-[15px] font-extrabold tracking-[-0.2px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.16)] shadow-[0_10px_30px_rgba(18,87,214,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d4dbf] hover:shadow-[0_15px_35px_rgba(18,87,214,0.25)]"
                >
                  <span>
                    توظيف عاملة منزلية
                  </span>

                  <span className="text-[15px] font-extrabold sm:text-[17px] md:text-[18px] transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </a>
<a
                  href="/services/maid-visa"
                  className="hero-hire-button group relative inline-flex h-[50px] w-full min-w-0 sm:h-[56px] sm:w-auto sm:min-w-[220px] md:h-[58px] md:min-w-[235px] items-center justify-center gap-2.5 sm:gap-3 lg:gap-4 rounded-[14px] bg-[#1257D6] px-5 text-[13px] sm:px-7 sm:text-[14px] md:px-9 md:text-[15px] font-extrabold tracking-[-0.2px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.16)] shadow-[0_10px_30px_rgba(18,87,214,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d4dbf] hover:shadow-[0_15px_35px_rgba(18,87,214,0.25)]"
                >
                  <span>
                    احصل على تأشيرة الآن
                  </span>

                  <span className="text-[15px] font-extrabold sm:text-[17px] md:text-[18px] transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </a>
</div>

              <div className="flex items-center gap-6 text-black/60">
                <div>
                  <div className="text-lg font-normal text-black md:text-xl">
                    3,980+
                  </div>
                  <div className="mt-1 text-[10px] text-black/35">
                    عميل سعيد
                  </div>
                </div>


                <div className="hidden sm:block">
                  <div className="text-lg font-normal text-black md:text-xl">
                    10+
                  </div>
                  <div className="mt-1 text-[10px] text-black/35">
                    سنوات خبرة
                  </div>
                </div>
              </div>
            </div>

            {/* HERO IMAGES */}
            <div className="order-1 relative h-[300px] sm:h-[370px] lg:h-[430px] lg:order-2">

              <div className="absolute right-[7%] top-0 h-[82%] w-[52%] overflow-hidden rounded-[32px] bg-[#f5f2ec] p-3">
                <SiteImage
                  page="home" slot={4} fallbackSrc="/assets/new-images/1.jpg"
                  alt="عاملة منزلية"
                  className="h-full w-full rounded-[24px] object-cover object-top transition duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 left-[4%] h-[58%] w-[45%] overflow-hidden rounded-[30px] border-[6px] border-[#f5f2ec] bg-[#f5f2ec] p-3">
                <SiteImage
                  page="home" slot={5} fallbackSrc="/assets/new-images/2.jpg"
                  alt="خدمات منزلية"
                  className="h-full w-full rounded-[22px] object-cover object-top transition duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute bottom-[13%] right-[34%] z-10 h-[38%] w-[29%] overflow-hidden rounded-[25px] border-[6px] border-[#f5f2ec] bg-[#f5f2ec] p-3 shadow-[0_15px_45px_rgba(0,0,0,0.12)]">
                <SiteImage
                  page="home" slot={6} fallbackSrc="/assets/new-images/3.jpg"
                  alt="عاملة منزلية"
                  className="h-full w-full rounded-[18px] object-cover object-top"
                />
              </div>




            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto max-w-[1320px] px-4 py-4 md:px-8 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              ["01", "اختيار دقيق", "نختار لك الأنسب"],
              ["02", "خبرة حقيقية", "عاملات مؤهلات"],
              ["03", "إجراءات كاملة", "توظيف وتأشيرة"],
              ["04", "دعم مستمر", "نحن معك دائماً"],
            ].map(([num, title, text]) => (
              <div
                key={num}
                className="flex items-center gap-3 border-black/5 px-3 py-3 md:border-l"
              >
                <span className="text-[9px] text-[#F28C28]">
                  {num}
                </span>

                <div>
                  <div className="text-[11px] font-medium">
                    {title}
                  </div>

                  <div className="mt-1 text-[9px] text-black/30">
                    {text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="overflow-hidden bg-white py-14 md:py-28">
        <div className="mx-auto max-w-[1320px] px-4 md:px-8">

          <div className="mb-8 text-center md:mb-12">
            <div className="mb-3 text-[10px] font-bold tracking-[3px] text-[#F28C28]">
              OUR SERVICES
            </div>

            <h2 className="text-2xl font-black tracking-[-1px] text-[#172033] md:text-4xl">
              خدمات توظيف العاملات المنزلية في الإمارات
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {/* 01 */}
            <article className="services-slide services-slide-right services-glass-card services-blue-orange services-six-card rounded-[22px] p-5 md:rounded-[30px] md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  AL SAADA MAIDS
                </div>

                <h3 className="mb-4 text-[19px] font-black leading-[1.45] text-white sm:text-[21px] md:text-[27px]">
                  خدمة توظيف عاملة منزلية بدوام جزئي أو كامل في الإمارات
                </h3>

                <p className="text-[11px] font-bold leading-7 text-white/90 md:text-[13px]">
                  وظّف عاملة منزلية بدوام جزئي لإنجاز المهام المنزلية المهمة.
                </p>
              </div>
            </article>

            {/* 02 */}
            <article className="services-slide services-slide-left services-glass-card services-orange-blue services-six-card rounded-[22px] p-5 md:rounded-[30px] md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M12 3l2.8 5.7L21 9.6l-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3z" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  WHY AL SAADA
                </div>

                <h3 className="mb-4 text-[19px] font-black leading-[1.45] text-white sm:text-[21px] md:text-[27px]">
                  أفضل خدمة توظيف عاملة منزلية في الإمارات
                </h3>

                <p className="text-[11px] font-bold leading-7 text-white/90 md:text-[13px]">
                  هل تبحث عن مساعدة منزلية في الإمارات؟ نقدم مساعدات منزليات مدربات بشكل احترافي وذوات خبرة، ونساعدك في اختيار الحل الأنسب لاحتياجاتك المنزلية.
                </p>
              </div>
            </article>

            {/* 03 */}
            <article className="services-slide services-slide-right services-glass-card services-orange-blue services-six-card rounded-[22px] p-5 md:rounded-[30px] md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M4 12h16M12 4v16" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  FULL TIME
                </div>

                <h3 className="mb-4 text-[19px] font-black leading-[1.45] text-white sm:text-[21px] md:text-[27px]">
                  خدمة توظيف عاملة منزلية بدوام كامل في الإمارات
                </h3>

                <p className="text-[11px] font-bold leading-7 text-white/90 md:text-[13px]">
                  احصل على خدمة توظيف عاملة منزلية بدوام كامل لمنزلك أو فيلتك أو شقتك في الإمارات.
                </p>
              </div>
            </article>

            {/* 04 */}
            <article className="services-slide services-slide-left services-glass-card services-blue-orange services-six-card rounded-[22px] p-5 md:rounded-[30px] md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M6 4h12v16H6z" />
                  <path d="M9 8h6M9 12h6M9 16h4" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  CHOOSE SMART
                </div>

                <h3 className="mb-4 text-[19px] font-black leading-[1.45] text-white sm:text-[21px] md:text-[27px]">
                  استعن بأفضل عاملة منزلية في الإمارات
                </h3>

                <p className="text-[11px] font-bold leading-7 text-white/90 md:text-[13px]">
                  عاملاتنا المنزلية المدربات بشكل احترافي سيجعلن الحياة أسهل بكثير من خلال الاعتناء بالمهام المنزلية اليومية.
                </p>
              </div>
            </article>

            {/* 05 */}
            <article className="services-slide services-slide-right services-glass-card services-blue-orange services-six-card rounded-[22px] p-5 md:rounded-[30px] md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M4 7h16M7 3v4M17 3v4M5 11h14M5 15h8M5 19h6" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  CLEAR PRICING
                </div>

                <h3 className="mb-4 text-[19px] font-black leading-[1.45] text-white sm:text-[21px] md:text-[27px]">
                  أسعار شفافة / توصيل مجاني
                </h3>

                <p className="text-[11px] font-bold leading-7 text-white/90 md:text-[13px]">
                  شركة AL SAADA Maids هي شريكك الموثوق في خدمة توظيف العاملات المنزلية في الإمارات مع أسعار واضحة وتجربة منظمة.
                </p>
              </div>
            </article>

            {/* 06 */}
            <article className="services-slide services-slide-left services-glass-card services-orange-blue services-six-card rounded-[22px] p-5 md:rounded-[30px] md:p-9">
              <div className="services-six-icon">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                  <path d="M7 3h10v18H7z" />
                  <path d="M9.5 7h5M9.5 11h5M9.5 15h3" />
                </svg>
              </div>

              <div className="services-six-content">
                <div className="mb-3 text-[10px] font-bold tracking-[2px] text-white/75">
                  VISA SUPPORT
                </div>

                <h3 className="mb-4 text-[19px] font-black leading-[1.45] text-white sm:text-[21px] md:text-[27px]">
                  أسرع موافقات على تأشيرات العاملات المنزلية
                </h3>

                <p className="text-[11px] font-bold leading-7 text-white/90 md:text-[13px]">
                  نتعامل مع متطلبات تأشيرة العاملة المنزلية ونساعدك في استكمال الإجراءات المطلوبة بطريقة واضحة ومنظمة.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* LOCATION / GOOGLE MAP */}
      <section className="border-y border-[#E8EDF4] bg-[#F7F9FC] py-12 md:py-24">
        <div className="mx-auto max-w-[1320px] px-4 md:px-8">

          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="mb-3 text-[10px] font-medium tracking-[3px] text-[#F28C28]">
                OUR LOCATION
              </div>

              <h2 className="text-2xl font-normal tracking-[-1px] text-[#172033] md:text-4xl">
                موقعنا في الإمارات
              </h2>

              <p className="mt-4 max-w-[520px] text-[12px] leading-7 text-black/40">
                يمكنك مشاهدة موقعنا مباشرة على الخريطة أو فتح
                الموقع في Google Maps للحصول على الاتجاهات.
              </p>
            </div>

            <a
              href={locationUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-[#1257D6] px-6 py-3.5 text-[11px] font-normal text-white transition hover:bg-[#F28C28]"
            >
              فتح الموقع في Google Maps
              <span className="text-[13px]">↗</span>
            </a>

          </div>

          
          <div className="location-map-cta-grid">

            <div className="location-map-card">
<div className="overflow-hidden rounded-[20px] border border-[#E3E9F2] bg-white p-1.5 md:rounded-[28px] md:p-2 shadow-[0_20px_60px_rgba(18,87,214,0.08)]">

            <div className="relative h-[260px] overflow-hidden rounded-[18px] md:h-[500px] md:rounded-[22px]">

              <iframe
                title="AL SAADA Dubai Location"
                src={locationEmbed || "about:blank"}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

            </div>

          </div>
            </div>

<div className="location-cta-card relative mx-auto max-w-[1320px] overflow-hidden rounded-[24px] bg-[#1257D6] md:rounded-[32px]">

          <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#F28C28]/20 blur-[90px]" />

          <div className="relative px-5 py-12 text-center md:px-10 md:py-24">
            <div className="mb-5 text-[10px] tracking-[3px] text-[#F28C28]">
              GET STARTED
            </div>

            <h2 className="mb-5 text-2xl font-normal leading-[1.4] text-white md:text-5xl">
              جاهز تجد المساعدة
              <br />
              <span className="text-[#1257D6]">
                المناسبة لمنزلك؟
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-[480px] text-[12px] leading-7 text-white/35">
              تحدث معنا وسنساعدك في معرفة الخيارات المناسبة
              والخطوات المطلوبة.
            </p>

            <a
              href="#"
              className="inline-flex rounded-full bg-[#F28C28] px-8 py-3.5 text-[11px] font-medium text-white transition hover:bg-[#1257D6]"
            >
              احصل على تأشيرة
            </a>

            <div className="mt-5 text-center text-[13px] font-black text-[#172033]">
              معالجة سريعة + دعم متكامل
            </div>
          </div>
        </div>

          </div>


          <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 lg:gap-4 rounded-[20px] border border-[#E8EDF4] bg-white px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1257D6]">
                <span className="text-sm">⌖</span>
              </div>

              <div>
                <div className="text-[11px] font-medium text-[#172033]">
                  الإمارات العربية المتحدة
                </div>

                <div className="mt-1 text-[9px] text-black/30">
                  موقعنا على Google Maps
                </div>
              </div>

            </div>

            <a
              href={locationUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-normal text-[#1257D6] transition hover:text-[#F28C28]"
            >
              عرض التفاصيل والاتجاهات ←
            </a>

          </div>

        </div>
      </section>


      {/* REVIEWS */}
      <section className="overflow-hidden bg-[#F7F9FC] pt-14 pb-0 md:pt-28 md:pb-0">

        <div className="mx-auto mb-9 max-w-[1320px] px-4 md:mb-14 md:px-5 text-center md:px-8">

          <div className="mb-3 text-[10px] font-medium tracking-[3px] text-[#F28C28]">
            CLIENT REVIEWS
          </div>

          <h2 className="text-2xl font-normal tracking-[-1px] text-[#172033] md:text-4xl">
            تجارب عملائنا
          </h2>

          <p className="mx-auto mt-4 max-w-[500px] text-[12px] leading-7 text-black/40">
            آراء حقيقية من عملاء اختاروا خدماتنا للحصول على
            تجربة أسهل وأكثر راحة.
          </p>

          <div className="mt-5 text-sm tracking-[3px] text-[#F28C28]">
            ★★★★★
            <span className="mr-2 text-[11px] tracking-normal text-black/35">
              4.8 من 5 • +200 تقييم
            </span>
          </div>

        </div>

        {/* الصف الأول - 200 تقييم */}
        <div className="review-marquee mb-5">
          <div className="review-track review-track-right">

            {mixedReviews.map((review, i) => (
              <div
                key={`review-top-${i}`}
                dir={/[A-Za-z]/.test(review.text) ? "ltr" : "rtl"}
                className="w-[275px] shrink-0 rounded-[20px] border border-[#E8EDF4] bg-white p-5 md:w-[390px] md:rounded-[24px] md:p-6 shadow-[0_10px_35px_rgba(20,50,90,0.04)] md:w-[390px]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-[12px] tracking-[3px] text-[#F28C28]">
                    ★★★★★
                  </div>

                  <span className="rounded-full bg-[#F3F7FC] px-3 py-1.5 text-[9px] text-[#1257D6]">
                    {/[A-Za-z]/.test(review.text) ? "Verified" : "عميلة"}
                  </span>
                </div>

                <p className="mb-6 text-[11px] leading-6 text-black/50 md:text-[12px] md:leading-7">
                  “{review.text}”
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF] text-xs font-medium text-[#1257D6]">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-[#172033]">
                      {review.name}
                    </div>

                    <div className="mt-1 text-[9px] text-black/30">
                      {review.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* الصف الثاني - 200 تقييم */}
        <div className="review-marquee">
          <div className="review-track review-track-left">

            {mixedReviews.map((review, i) => (
              <div
                key={`review-bottom-${i}`}
                dir={/[A-Za-z]/.test(review.text) ? "ltr" : "rtl"}
                className="w-[275px] shrink-0 rounded-[20px] border border-[#E8EDF4] bg-white p-5 md:w-[390px] md:rounded-[24px] md:p-6 shadow-[0_10px_35px_rgba(20,50,90,0.04)] md:w-[390px]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-[12px] tracking-[3px] text-[#F28C28]">
                    ★★★★★
                  </div>

                  <span className="rounded-full bg-[#F3F7FC] px-3 py-1.5 text-[9px] text-[#1257D6]">
                    {/[A-Za-z]/.test(review.text) ? "Verified" : "عميلة"}
                  </span>
                </div>

                <p className="mb-6 text-[11px] leading-6 text-black/50 md:text-[12px] md:leading-7">
                  “{review.text}”
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF2FF] text-xs font-medium text-[#1257D6]">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-[#172033]">
                      {review.name}
                    </div>

                    <div className="mt-1 text-[9px] text-black/30">
                      {review.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </section>


      {/* COMPANY LOGOS */}
      <section
        ref={logosRef}
        className={
          "bg-[#F7F9FC] px-4 pt-0 pb-12 md:px-8 md:pb-16 " +
          "transition-all duration-700 ease-out " +
          (logosVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95")
        }
      >
        <div className="mx-auto flex max-w-[900px] flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16 md:gap-24">

          {/* COMPANY 10 */}
          <div className="flex items-center justify-center gap-4">
            <img
              src="/images/saada/company-logo-10.png"
              alt=""
              className="block h-auto w-[190px] object-contain sm:w-[230px] md:w-[280px]"
            />

            <div className="flex items-center gap-2 whitespace-nowrap text-[#9BC4EA]">
              <span className="text-[22px] font-black leading-none">
                ✓
              </span>

              <span className="text-[10px] font-black sm:text-[11px] md:text-[12px]">
                هذا الموقع برعاية
              </span>
            </div>
          </div>

          {/* COMPANY 20 */}
          <div className="flex items-center justify-center gap-4">
            <img
              src="/images/saada/company-logo-20.png"
              alt=""
              className="block h-auto w-[110px] object-contain sm:w-[135px] md:w-[165px]"
            />

            <div className="flex items-center gap-2 whitespace-nowrap text-[#9BC4EA]">
              <span className="text-[22px] font-black leading-none">
                ✓
              </span>

              <span className="text-[10px] font-black sm:text-[11px] md:text-[12px]">
                هذا الموقع برعاية
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <Footer />
    </main>
  )
}