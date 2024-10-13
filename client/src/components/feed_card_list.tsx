import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { timeago } from "../utils/timeago";
import { HashTag } from "./hashtag";
import { useMemo } from "react";
import { Card } from "./ui/card";
import { useInView } from "react-intersection-observer"; // 引入 Intersection Observer

export function FeedCardGrid({
    id,
    title,
    avatar,
    draft,
    listed,
    top,
    summary,
    hashtags,
    createdAt,
    updatedAt,
}: {
    id: string;
    avatar?: string;
    draft?: number;
    listed?: number;
    top?: number;
    title: string;
    summary: string;
    hashtags: { id: number; name: string }[];
    createdAt: Date;
    updatedAt: Date;
}) {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        threshold: 0.1, // 当 10% 的元素可见时触发
    });

    return useMemo(
        () => (
            <Card className="p-4 my-2 transition-all duration-500">
                <Link href={`/feed/${id}`} target="_blank">
                    {avatar && (
                        <div className="flex flex-row items-center mb-2 rounded-xl overflow-clip">
                            <img
                                src={avatar}
                                alt={`Avatar of ${title}`}
                                className="object-cover object-center w-full max-h-96 hover:scale-105 transition duration-300"
                            />
                        </div>
                    )}
                    <h1
                        ref={ref}
                        className={`text-xl font-bold ${
                            inView ? "text-red-500" : "text-gray-900"
                        } dark:text-gray-100 text-pretty overflow-hidden`}
                    >
                        {title}
                    </h1>
                    <p className="space-x-2">
                        <span
                            className={`text-sm ${
                                inView ? "text-red-500" : "text-gray-400"
                            }`}
                            title={new Date(createdAt).toLocaleString()}
                        >
                            {createdAt === updatedAt
                                ? timeago(createdAt)
                                : t("feed_card.published$time", {
                                      time: timeago(createdAt),
                                  })}
                        </span>
                        {createdAt !== updatedAt && (
                            <span
                                className={`text-sm ${
                                    inView ? "text-red-500" : "text-gray-400"
                                }`}
                                title={new Date(updatedAt).toLocaleString()}
                            >
                                {t("feed_card.updated$time", {
                                    time: timeago(updatedAt),
                                })}
                            </span>
                        )}
                    </p>
                    <p className="space-x-2">
                        {draft === 1 && (
                            <span
                                className={`text-sm ${
                                    inView ? "text-red-500" : "text-gray-400"
                                }`}
                            >
                                草稿
                            </span>
                        )}
                        {listed === 0 && (
                            <span
                                className={`text-sm ${
                                    inView ? "text-red-500" : "text-gray-400"
                                }`}
                            >
                                未列出
                            </span>
                        )}
                        {top === 1 && (
                            <span className="text-primary text-sm">置顶</span>
                        )}
                    </p>
                    <p className="text-pretty overflow-hidden dark:text-neutral-500">
                        {summary}
                    </p>
                    {hashtags.length > 0 && (
                        <div className="mt-2 flex flex-row flex-wrap justify-start gap-x-2">
                            {hashtags.map(({ id, name }) => (
                                <HashTag key={id} name={name} />
                            ))}
                        </div>
                    )}
                </Link>
            </Card>
        ),
        [id, title, avatar, draft, listed, top, summary, hashtags, createdAt, updatedAt, inView]
    );
}
